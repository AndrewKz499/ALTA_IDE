# AltaIDE Documentation Pack

Этот каталог содержит переносимый пакет документации для AltaIDE Design System и интерактивных прототипов.

Цель пакета — позволить другой команде или AI-агенту перенести проект в другой репозиторий, стек или продукт без устных пояснений и без потери архитектурных правил.

## Рекомендуемый порядок чтения

1. [`PROJECT_OVERVIEW.md`](PROJECT_OVERVIEW.md) — что такое AltaIDE, цели, пользовательские сценарии и источники истины.
2. [`TECHNICAL_SPEC.md`](TECHNICAL_SPEC.md) — стек, ограничения, runtime и Definition of Done.
3. [`ARCHITECTURE.md`](ARCHITECTURE.md) — слои системы и направление зависимостей.
4. [`DESIGN_SYSTEM_SPEC.md`](DESIGN_SYSTEM_SPEC.md) — Foundations, Variables, Tokens, themes и Figma → Code mapping.
5. [`COMPONENT_SPEC.md`](COMPONENT_SPEC.md) — канонический контракт reusable component.
6. [`INTERACTION_SPEC.md`](INTERACTION_SPEC.md) — states, keyboard, validation, popup/focus и accessibility behavior.
7. [`glossary.md`](glossary.md) — единый словарь Figma, tokens, code и prototype terminology.
8. [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md) — пошаговый перенос в другой проект.

## Реестры

- [`component-registry.md`](component-registry.md) — Figma component → GitHub path → states → status → version.
- [`prototypes-registry.md`](prototypes-registry.md) — scenario → hypothesis → commit/tag → URL → status.

## Дополнительные документы

- [`component-structure.md`](component-structure.md) — подробные правила структуры компонента.
- `specs/` — точечные спецификации компонентов/экранов.
- `gap/` — зафиксированные пробелы дизайн-системы, обнаруженные при сборке прототипов.

## Token documentation

Отдельный паспорт token pipeline находится в:

[`../tokens/README.md`](../tokens/README.md)

Source of truth для значений:

```text
../tokens/source/Source.tokens.json
../tokens/source/Color.tokens.json
../tokens/source/Light.tokens.json
../tokens/source/Dark.tokens.json
```

Runtime representation:

```text
../tokens/tokens.css
```

`tokens.css` является generated artifact и не редактируется вручную.

## Ключевой архитектурный поток

```text
Figma Design System
        ↓
Variables / Component Sets
        ↓
tokens/source/*.tokens.json
        ↓
tokens/tokens.css
        ↓
components/*
        ↓
prototypes/*
        ↓
scenarios / research
```

Допустимое направление зависимостей:

```text
prototype → component → semantic token → primitive
```

## Ключевые инварианты при переносе

- semantic tokens сохраняются;
- один DOM и один CSS компонента для Light/Dark;
- компонент живёт непосредственно в `components/<name>/`;
- component CSS не копируется в prototypes;
- каждый reusable component имеет README и Preview;
- Figma variants трассируются в code states/props;
- registries остаются актуальными;
- исследовательские версии можно восстановить по commit/tag.

## Минимальный migration package

```text
tokens/
components/
assets/
docs/
CLAUDE.md
README.md
```

Для переноса экранов и пользовательских сценариев дополнительно:

```text
prototypes/
references/
```

## Источники проекта

- Figma: `🧩 AltaIDE DS`
- GitHub: `AndrewKz499/ALTA_IDE`
- GitHub Pages: component previews и prototypes из текущего репозитория

Перед переносом рекомендуется зафиксировать source commit и заполнить Migration Record по шаблону из [`MIGRATION_GUIDE.md`](MIGRATION_GUIDE.md).
