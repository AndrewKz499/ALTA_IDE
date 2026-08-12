# AltaIDE — Architecture

## 1. Архитектурный принцип

AltaIDE разделён на последовательные слои. Каждый слой имеет один источник ответственности и передаёт результат следующему.

```text
Figma Design System
      ↓
Variables / Component Sets
      ↓
Token source JSON
      ↓
Generated CSS tokens
      ↓
Reusable code components
      ↓
Prototype screens
      ↓
Clickable scenarios
      ↓
User research / validation
```

## 2. Слои

### Figma
Содержит Foundations, Variables, Component Sets, Variants и визуальную спецификацию.

### Token source
`tokens/source/` содержит `Source.tokens.json`, `Color.tokens.json`, `Light.tokens.json`, `Dark.tokens.json`.

### Generated token runtime
`tokens/tokens.css` конвертирует Figma aliases в CSS custom properties и реализует theme switching.

### Components
`components/` — независимые reusable UI building blocks. Компонент не должен знать, на каком экране он используется.

### Prototypes
`prototypes/` — композиционный слой. Здесь разрешён layout, но не переопределение внутренних styles компонентов.

### Documentation/registries
`docs/` хранит архитектурные правила, реестры, gap analysis и спецификации.

## 3. Направление зависимостей

Допустимо:

`prototype → component → semantic token → primitive`

Недопустимо:

- `component → prototype`;
- `semantic token → component`;
- `component → literal HEX` при наличии token;
- `prototype → копия component CSS`.

## 4. Figma ↔ Code mapping

| Figma | Code |
|---|---|
| Primitive Variable | primitive CSS custom property |
| Semantic Variable / Alias | semantic CSS custom property |
| Mode | theme (`data-theme`) |
| Component Set | component directory |
| Variant | state/attribute/class/prop |
| Instance | composition/use of component |
| Auto Layout | Flex/Grid |

Абсолютные координаты Figma не должны переноситься как архитектура компонента.

## 5. Theme architecture

Dark — базовая semantic theme. Light переопределяет отличающиеся semantic values. Явный `[data-theme]` имеет приоритет над системной темой. Один и тот же DOM используется в обеих темах.

## 6. Repository architecture

```text
ALTA_IDE/
├── foundations/
├── tokens/
├── components/
├── prototypes/
├── assets/
├── references/
└── docs/
    ├── specs/
    ├── gap/
    ├── component-registry.md
    └── prototypes-registry.md
```

## 7. Registry model

`component-registry.md` фиксирует наличие, путь, states и version компонента. `prototypes-registry.md` фиксирует сценарий, гипотезу, commit/tag, URL и status.

## 8. Gap-first rule

Если экран требует отсутствующий reusable component: prototype implementation останавливается → проблема фиксируется в `docs/gap/` → компонент реализуется → registry обновляется → prototype продолжается.

## 9. Архитектура исследования

Исследование должно быть воспроизводимым. Рабочий prototype связывается с commit/tag, чтобы состояние теста можно было восстановить.

## 10. Цель архитектуры

Главная цель — однозначная трассировка:

`Figma decision → token/component → prototype → tested scenario → version`.