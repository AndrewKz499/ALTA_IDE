#!/usr/bin/env python3
"""Static verifier for AltaIDE research-prototype repository rules.

This script intentionally performs only deterministic repository checks. It does
not replace visual QA, interaction QA, accessibility review, or Figma
verification and therefore cannot grant Ready / Research Ready by itself.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS_DIR = ROOT / "components"
PROTOTYPES_DIR = ROOT / "prototypes"
COMPONENT_REGISTRY = ROOT / "docs" / "component-registry.md"
PROTOTYPE_REGISTRY = ROOT / "docs" / "prototypes-registry.md"

ALLOWED_COMPONENT_STATUSES = {"Planned", "Generated", "Verifying", "Ready", "Deprecated"}
ALLOWED_PROTOTYPE_STATUSES = {"Draft", "Visual QA", "Interaction QA", "Research Ready", "Tested", "Archived"}

HEX_RE = re.compile(r"(?<![\w-])#[0-9a-fA-F]{3,8}\b")
RGB_RE = re.compile(r"\b(?:rgb|rgba|hsl|hsla)\s*\(", re.IGNORECASE)
VAR_FALLBACK_HEX_RE = re.compile(r"var\([^,]+,\s*#[0-9a-fA-F]{3,8}\s*\)", re.IGNORECASE)
ABSOLUTE_ATTR_RE = re.compile(r"(?:src|href)\s*=\s*[\"']/[^/\"']", re.IGNORECASE)
FETCH_HTML_RE = re.compile(r"fetch\s*\([^)]*\.html", re.IGNORECASE | re.DOTALL)
MARKDOWN_ROW_RE = re.compile(r"^\|(.+)\|\s*$")

errors: list[str] = []
warnings: list[str] = []


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def fail(path: Path | str, message: str) -> None:
    errors.append(f"{path}: {message}")


def warn(path: Path | str, message: str) -> None:
    warnings.append(f"{path}: {message}")


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        fail(rel(path), "file is not valid UTF-8")
        return ""


def component_dirs() -> list[Path]:
    if not COMPONENTS_DIR.exists():
        fail("components/", "directory is missing")
        return []
    return sorted(p for p in COMPONENTS_DIR.iterdir() if p.is_dir() and not p.name.startswith("."))


def prototype_dirs() -> list[Path]:
    if not PROTOTYPES_DIR.exists():
        fail("prototypes/", "directory is missing")
        return []
    return sorted(p for p in PROTOTYPES_DIR.iterdir() if p.is_dir() and not p.name.startswith("."))


def check_component_structure() -> None:
    for directory in component_dirs():
        name = directory.name
        required = ["index.html", f"{name}.css", "preview.html", "README.md"]
        for filename in required:
            if not (directory / filename).exists():
                fail(rel(directory), f"missing required file: {filename}")

        if (directory / "template.html").exists():
            warn(rel(directory / "template.html"), "legacy component file; canonical entry is index.html")
        if (directory / "demo.html").exists():
            warn(rel(directory / "demo.html"), "legacy component file; canonical preview is preview.html")


def check_component_css() -> None:
    for directory in component_dirs():
        css = directory / f"{directory.name}.css"
        if not css.exists():
            continue
        text = read_text(css)
        for lineno, line in enumerate(text.splitlines(), start=1):
            if HEX_RE.search(line):
                fail(f"{rel(css)}:{lineno}", "literal HEX color is forbidden in component CSS")
            if RGB_RE.search(line):
                fail(f"{rel(css)}:{lineno}", "literal RGB/HSL color is forbidden in component CSS")
            if VAR_FALLBACK_HEX_RE.search(line):
                fail(f"{rel(css)}:{lineno}", "HEX fallback inside var() is forbidden")


def check_paths_and_local_fetch() -> None:
    roots = [COMPONENTS_DIR, PROTOTYPES_DIR]
    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if path.suffix.lower() not in {".html", ".js"} or not path.is_file():
                continue
            text = read_text(path)
            for lineno, line in enumerate(text.splitlines(), start=1):
                if ABSOLUTE_ATTR_RE.search(line):
                    fail(f"{rel(path)}:{lineno}", "root-relative src/href is forbidden; use a relative URL")
            if FETCH_HTML_RE.search(text):
                fail(rel(path), "fetch() of local HTML fragments is incompatible with file://")


def parse_markdown_table(path: Path) -> tuple[list[str], list[list[str]]]:
    if not path.exists():
        fail(rel(path), "registry is missing")
        return [], []

    lines = read_text(path).splitlines()
    header: list[str] = []
    rows: list[list[str]] = []
    in_table = False

    for line in lines:
        match = MARKDOWN_ROW_RE.match(line)
        if not match:
            if in_table and rows:
                break
            continue

        cells = [cell.strip() for cell in match.group(1).split("|")]
        if not header:
            header = cells
            in_table = True
            continue

        if all(set(cell) <= {"-", ":"} for cell in cells):
            continue

        rows.append(cells)

    return header, rows


def check_component_registry() -> None:
    header, rows = parse_markdown_table(COMPONENT_REGISTRY)
    if not header:
        return

    required_columns = {
        "Figma",
        "GitHub path",
        "States",
        "Status",
        "Version",
        "Verified against Figma",
        "Verified at",
        "Used in prototypes",
    }
    missing = required_columns - set(header)
    if missing:
        fail(rel(COMPONENT_REGISTRY), f"missing required columns: {', '.join(sorted(missing))}")
        return

    index = {name: header.index(name) for name in header}
    for row in rows:
        if len(row) < len(header):
            fail(rel(COMPONENT_REGISTRY), f"malformed registry row: {' | '.join(row)}")
            continue

        status = row[index["Status"]]
        if status not in ALLOWED_COMPONENT_STATUSES:
            fail(rel(COMPONENT_REGISTRY), f"invalid component status: {status}")

        if status == "Ready":
            figma = row[index["Verified against Figma"]]
            verified_at = row[index["Verified at"]]
            if figma in {"", "—", "-"}:
                fail(rel(COMPONENT_REGISTRY), "Ready component has no Verified against Figma value")
            if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", verified_at):
                fail(rel(COMPONENT_REGISTRY), "Ready component has no valid Verified at date")


def check_prototype_registry() -> None:
    header, rows = parse_markdown_table(PROTOTYPE_REGISTRY)
    if not header:
        return

    required_columns = {"ID", "Scenario", "Hypothesis", "Prototype commit", "DS commit", "URL", "Status"}
    missing = required_columns - set(header)
    if missing:
        fail(rel(PROTOTYPE_REGISTRY), f"missing required columns: {', '.join(sorted(missing))}")
        return

    index = {name: header.index(name) for name in header}
    for row in rows:
        if len(row) < len(header):
            fail(rel(PROTOTYPE_REGISTRY), f"malformed registry row: {' | '.join(row)}")
            continue

        status = row[index["Status"]]
        if status not in ALLOWED_PROTOTYPE_STATUSES:
            fail(rel(PROTOTYPE_REGISTRY), f"invalid prototype status: {status}")

        if status == "Research Ready":
            for column in ("Prototype commit", "DS commit", "URL"):
                if row[index[column]] in {"", "—", "-"}:
                    fail(rel(PROTOTYPE_REGISTRY), f"Research Ready prototype is missing {column}")


def check_prototype_basics() -> None:
    for directory in prototype_dirs():
        if not (directory / "index.html").exists():
            fail(rel(directory), "prototype is missing index.html")

        html_files = list(directory.glob("*.html"))
        for path in html_files:
            text = read_text(path).lower()
            suspicious = [
                "figma node",
                "node id",
                "states matrix",
                "developer controls",
                "debug controls",
            ]
            for marker in suspicious:
                if marker in text:
                    warn(rel(path), f"possible developer-only UI marker found: {marker!r}")


def main() -> int:
    check_component_structure()
    check_component_css()
    check_paths_and_local_fetch()
    check_component_registry()
    check_prototype_registry()
    check_prototype_basics()

    if warnings:
        print("WARNINGS")
        for item in warnings:
            print(f"  - {item}")

    if errors:
        print("ERRORS")
        for item in errors:
            print(f"  - {item}")
        print(f"\nVerification failed: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1

    print(f"Verification passed: 0 errors, {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
