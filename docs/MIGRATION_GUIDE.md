# AltaIDE — Migration Guide

## 1. Цель

Инструкция для переноса AltaIDE Design System и prototypes в другой GitHub/GitLab/монорепозиторий или продуктовый проект.

## 2. Что переносить обязательно

Минимальный пакет:

```text
tokens/
components/
assets/
docs/
CLAUDE.md
```

Если нужны пользовательские сценарии и экраны, дополнительно переносить `prototypes/` и `references/`.

## 3. Порядок миграции

### Шаг 1. Token sources

Скопировать `Source.tokens.json`, `Color.tokens.json`, `Light.tokens.json`, `Dark.tokens.json`. Это source of truth значений.

### Шаг 2. Generated tokens

Скопировать `tokens/tokens.css` и `tokens/README.md`. `tokens.css` вручную не редактировать. Если target project использует другой token runtime, конвертацию делать из JSON source.

### Шаг 3. Assets/fonts

Сохранить относительные пути или выполнить контролируемый mapping. Проверить SVG/PNG/fonts.

### Шаг 4. Components

Переносить как независимые directories. Не объединять их по категориям, если это меняет канонические paths.

### Шаг 5. Theme contract

Target project должен поддержать эквивалент `data-theme="light|dark"` либо adapter, который устанавливает те же semantic CSS variables.

### Шаг 6. Documentation/registries

Сохранить `component-registry.md`, `prototypes-registry.md`, `glossary.md` и архитектурные документы.

### Шаг 7. Prototypes

Переносить только после components. Prototype CSS не должен становиться источником component styles.

## 4. Если target project использует framework

React/Vue/Svelte/etc. не меняют архитектурный смысл:

```text
Figma Variant → framework prop/state
Semantic token → CSS variable/theme token
Component → framework component
Preview → Storybook/example page
Prototype → route/page/fixture
```

Нельзя заменять semantic token hardcode-значением только из-за framework.

## 5. TypeScript/Storybook

Можно заменить `index.html` на framework implementation, а `preview.html` — на Storybook stories, если сохраняются variants/states, Light/Dark, accessibility, registry, прямой preview URL и воспроизводимость версии.

## 6. Path audit

Перед commit проверить: нет абсолютных repo-specific runtime URL; README Preview links обновлены; asset paths корректны; нет ссылок на старый repository после полной migration.

## 7. Source-of-truth audit

После миграции команда должна однозначно знать, где меняются токены, component implementation, component status, prototype version и какой Figma file является source design.

## 8. QA после переноса

Проверить минимум Button Preview, Input Preview, сложный popup (Dropdown/Autocomplete), Light/Dark, keyboard/focus, локальный запуск, публикацию preview и один prototype end-to-end.

## 9. Git history

Предпочтительно переносить с историей Git. Если переносится snapshot, зафиксировать исходный commit AltaIDE.

## 10. Migration record

В target project рекомендуется `docs/MIGRATION_RECORD.md`:

```text
Source repository:
Source commit:
Figma file:
Migration date:
Target repository:
Token adapter changes:
Component path changes:
Known gaps:
```

## 11. Критерий завершения

Миграция завершена, когда components/prototypes воспроизводимы, semantic token model сохранена, registries актуальны и команда может продолжить разработку без скрытых правил из исходного проекта.