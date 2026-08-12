# AltaIDE — Design System Specification

## 1. Назначение

Design System задаёт единый визуальный и поведенческий язык AltaIDE и обеспечивает прямое соответствие между Figma и кодом.

## 2. Foundations

Базовые области: Logo, Colors, Typography, Icons, Window, spacing/sizing, radii, borders. Primitives сами по себе не используются в компонентах; они являются базой для semantic variables.

## 3. Variable collections

В проекте используются четыре экспортируемых набора:

- `Source` — числа, размеры, типографика;
- `Color` — цветовые primitives Light/Dark;
- `Light` — semantic values светлой темы;
- `Dark` — semantic values тёмной темы.

Semantic layer сгруппирован по назначению компонентов.

## 4. Token mapping

Figma path превращается в CSS custom property в `kebab-case`.

```text
Buttons/Primary/Background/Hover
→ --buttons-primary-background-hover
```

Компонент использует semantic token:

```css
.ds-button {
  background: var(--buttons-primary-background-default);
}
```

## 5. Theme model

**1 component → 1 DOM → 1 component CSS → 2 themes through semantic tokens**.

Запрещены `light/` / `dark/` директории компонента, `*-light.css` / `*-dark.css` и разные DOM-структуры для тем.

## 6. Typography

Основной интерфейс — Rubik. Code/editor content — JetBrains Mono там, где это задано Figma. Размер, weight и line-height должны соответствовать Figma styles/tokens.

## 7. Icons

- Используются оригинальные Figma assets/vector paths.
- Размер контейнера фиксируется спецификацией компонента.
- Декоративные SVG получают `aria-hidden="true"`.
- Icon-only controls получают accessible name.

## 8. Component states

Универсальный словарь: Default, Hover, Pressed/Active, Focused, Selected, Filled, Invalid, Loading, Disabled. Используются только реально существующие states конкретного Component Set.

## 9. Layout transfer

- Auto Layout → Flex/Grid;
- Variables → tokens;
- Variants → attributes/classes/states;
- Instances → composition;
- constraints → responsive/min/max behavior.

Не переносить координаты canvas как абсолютное позиционирование компонента.

## 10. Preview standard

Каждый `preview.html` содержит название/контекст, Light/Dark switch, **Interactive component** сверху, разделитель, **States matrix** ниже. Preview не содержит встроенный README.

## 11. Documentation standard

README компонента содержит назначение, ссылку на GitHub Pages Preview, files, variants/states/API, theming, accessibility, ограничения/расхождения с Figma.

## 12. Visual QA

Минимально проверяются Default, Hover, Focused, Disabled в Light/Dark, Invalid/Error и Loading если есть, long text, minimum width и отсутствие layout shift.

## 13. Source of truth hierarchy

1. Figma component/variables — дизайн-спецификация.
2. Token JSON — значения токенов.
3. Generated `tokens.css` — runtime representation.
4. Component README/spec — кодовый контракт.
5. Preview — визуальная проверка реализации.