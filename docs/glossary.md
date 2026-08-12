# Глоссарий · AltaIDE Design System

Единый словарь терминов для цепочки **Figma → токены → GitHub → кодовые компоненты → экраны → сценарии**.

Документ используется как общий язык для дизайнеров, разработчиков, исследователей и AI-агентов при работе с AltaIDE и при переносе системы в другой проект.

## 1. Источники

- **Figma Design System:** `🧩 AltaIDE DS` — Foundations, Variables, Component Sets, Variants и визуальная спецификация.
- **GitHub:** `AndrewKz499/ALTA_IDE` — кодовая реализация компонентов, токенов, прототипов и документации.
- **Token source:** `tokens/source/*.tokens.json` — экспорт Figma Variables.
- **Runtime tokens:** `tokens/tokens.css` — сгенерированные CSS Custom Properties.
- **Component registry:** `docs/component-registry.md` — состояние кодовых компонентов.
- **Prototype registry:** `docs/prototypes-registry.md` — версии и статусы прототипов.

## 2. Термины Figma

### Foundations

Базовый слой дизайн-системы: Logo, Colors, Typography, Icons, Window, размеры, интервалы, радиусы, границы и другие визуальные основы.

### Variable

Именованное значение Figma. Может хранить цвет, число, строку или boolean. Variables являются исходной моделью design tokens.

### Collection

Контейнер Variables с одним или несколькими modes.

В AltaIDE используются:

- `Source` — primitive numbers, размеры и типографические значения;
- `Color` — primitive colors;
- `Light` — semantic values светлой темы;
- `Dark` — semantic values тёмной темы.

### Mode

Набор значений Variable Collection для конкретного контекста. В AltaIDE ключевой контекст — Light/Dark theme.

В коде mode выражается через CSS Custom Properties и `data-theme`.

### Primitive

Базовое значение без знания о месте применения: конкретный цвет, размер, radius, border width, font size и т. п.

Primitive не должен использоваться напрямую внутри reusable component, если для назначения существует semantic token.

### Semantic

Переменная со смыслом применения, например:

`Buttons/Primary/Background/Default`

Semantic Variable обычно является alias на primitive. Именно semantic layer должен использовать component CSS.

### Alias

Ссылка Variable на другую Variable. Типовой поток:

`Semantic → Primitive`.

Alias позволяет менять palette/foundation без переписывания component CSS.

### Component

Переиспользуемая сущность интерфейса в Figma.

В коде соответствует директории:

`components/<component-name>/`.

### Component Set

Набор связанных variants одного компонента.

Пример: Button с размерами, типами и states.

### Variant

Конкретная комбинация свойств Component Set: Size, State, Type, Icon position и т. п.

В коде variant превращается в attributes, classes, state или props — в зависимости от target stack.

### Instance

Использование опубликованного/локального Component в другом layout. В коде соответствует композиции reusable component.

### Auto Layout

Правила компоновки Figma. При переносе в Web преобразуется преимущественно в Flexbox/Grid, а не в абсолютные координаты canvas.

### Description

Документирующее описание компонента или variable collection. В AltaIDE подробная документация хранится прежде всего в component README/specs, а не только в Figma Description.

### Published Library

Опубликованная Figma Library. Полезна для командного reuse и Dev Mode, но для текущего token pipeline не является единственным механизмом передачи данных: Variables также экспортируются в JSON.

## 3. Термины токенов

### Design Token

Именованное машиночитаемое значение дизайна. В AltaIDE экспорт близок к DTCG и использует поля `$type`, `$value`, `$extensions`.

### Token Source

Неизменяемый snapshot Figma Variables:

```text
tokens/source/Source.tokens.json
tokens/source/Color.tokens.json
tokens/source/Light.tokens.json
tokens/source/Dark.tokens.json
```

Это source of truth для регенерации runtime tokens.

### tokens.css

Сгенерированный CSS-файл с primitive и semantic Custom Properties.

Правило: **не редактировать вручную**. Изменение значений должно начинаться в Figma/token source и проходить через генерацию.

### Raw token

Semantic value, которое по технической причине не выражено alias на primitive и выводится как literal. Это исключение должно быть явно задокументировано генератором/паспортом токенов.

### Cross-mode alias

Alias semantic variable одного mode на primitive другого mode. Сохраняется как явная ссылка и рассматривается как контролируемое исключение.

## 4. Темизация

### Theme

Набор semantic values для визуального режима интерфейса.

AltaIDE использует:

```html
<html data-theme="light">
<html data-theme="dark">
```

Приоритет runtime theme:

`explicit data-theme > prefers-color-scheme > Dark base`.

### Theme contract

Главное правило:

**1 component → 1 DOM → 1 component CSS → Light/Dark через semantic tokens.**

Отдельные `light/`/`dark/` реализации компонентов не создаются.

## 5. Термины кода

### Code Component

Переиспользуемая реализация Figma Component.

Канонический путь:

```text
components/<component-name>/
```

### Canonical component structure

```text
components/<component-name>/
├── index.html
├── <component-name>.css
├── <component-name>.js   # при необходимости
├── preview.html
└── README.md
```

### Namespaced CSS

CSS компонента не должен загрязнять глобальный scope. Используется собственный namespace, например:

```css
.ds-button {}
.ds-button__icon {}
```

### Interactive component

Живая реализация в верхней части `preview.html`, на которой можно проверить реальное поведение компонента.

### States matrix

Статическая визуальная матрица всех релевантных variants/states компонента. Размещается после Interactive component.

### Preview

Отдельный GitHub Pages стенд компонента. Preview предназначен для визуальной и интерактивной проверки и не дублирует README.

### Component README

Документация компонента: назначение, Preview URL, файлы, API/Variants, States, Theming, Accessibility, ограничения и расхождения с Figma.

## 6. Термины состояний

### Default

Базовое состояние control.

### Hover

Pointer feedback при наведении.

### Pressed / Active

Состояние физического нажатия или активной операции.

### Focused

Keyboard focus. В Web предпочтительно выражается через `:focus-visible`.

### Selected / Checked

Выбранное состояние элемента. Должно отражаться и визуально, и семантически.

### Filled

Control содержит пользовательское/выбранное значение.

### Invalid

Ошибка валидации. Для form controls обычно сопровождается `aria-invalid="true"` и доступным сообщением ошибки.

### Loading

Операция выполняется. Не должна вызывать layout shift или небезопасное повторное действие.

### Disabled

Control недоступен для действия. Для нативных controls используется `disabled`, если это соответствует семантике.

## 7. Термины прототипирования

### Screen

Цельный экран продукта, собранный из reusable components.

### Prototype

Интерактивная браузерная сборка одного или нескольких экранов.

### Scenario / Flow

Последовательность экранов и действий пользователя, проверяющая продуктовую гипотезу.

### Prototype registry

Реестр, связывающий сценарий с гипотезой, commit/tag, URL и статусом.

### Gap

Отсутствующий reusable component или системное правило, необходимое для экрана. Gap фиксируется до того, как недостающий компонент будет временно нарисован внутри prototype.

### Gap-first rule

Если prototype требует отсутствующий component: зафиксировать gap → реализовать component → обновить registry → продолжить prototype.

## 8. Термины исследования и передачи в разработку

### Product hypothesis

Проверяемое предположение о поведении/ценности интерфейса, для которого собирается prototype.

### Reproducibility

Возможность восстановить именно ту версию prototype, на которой проводилось исследование. Обеспечивается commit/tag и prototype registry.

### Handoff

Передача подтверждённого решения в разработку. В AltaIDE handoff должен сохранять соответствие:

`Figma Variant ↔ code state/prop ↔ semantic tokens`.

### Visual regression

Повторная проверка геометрии, spacing, typography, colors, states, themes и layout stability после изменений.

### Definition of Done

Набор обязательных проверок перед статусом Ready: Figma variants/states, Light/Dark, keyboard, accessibility, Preview, README, relative paths, `file://`, отсутствие console errors, registry update.

## 9. Соответствие Figma ↔ код

| Figma | Код |
|---|---|
| Variable primitive (`Source` / `Color`) | Primitive CSS Custom Property |
| Semantic Variable / Alias | Semantic CSS Custom Property |
| Mode Light/Dark | `data-theme` / theme override |
| Component | `components/<name>/` |
| Component Set | Набор variants/states одного code component |
| Variant property | Attribute / class / prop / state |
| Instance | Composition/use of component |
| Auto Layout | Flexbox / Grid |
| Constraints | min/max/responsive layout rules |
| Typography style | Typography tokens / CSS typography |
| Description | README/spec documentation |
| Prototype flow | HTML/JS scenario in `prototypes/` |

## 10. Ключевые проектные термины

**AltaIDE DS** — Figma Design System и её кодовое отражение.

**Component Registry** — источник состояния реализации компонентов.

**Prototype Registry** — источник состояния и версий исследовательских прототипов.

**Migration Pack** — набор архитектурных документов, токенов, компонентов, registries и правил, достаточный для переноса AltaIDE в другой проект без устных пояснений.
