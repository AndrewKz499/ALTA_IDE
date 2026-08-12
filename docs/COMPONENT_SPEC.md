# AltaIDE — Component Specification

## 1. Каноническое соответствие

`Figma Component → GitHub directory → implementation → preview → documentation`

Каждый компонент находится непосредственно в `components/<component-name>/`, имя каталога — `kebab-case`.

## 2. Структура

```text
components/<component-name>/
├── index.html
├── <component-name>.css
├── <component-name>.js   # при необходимости
├── preview.html
└── README.md
```

Допустим локальный `assets/`, если ресурс принадлежит только этому компоненту.

## 3. index.html

Содержит эталонную разметку компонента и примеры базового использования. Документационный интерфейс туда не добавляется.

## 4. CSS

- selectors namespaced, например `.ds-input`;
- semantic tokens через `var(--...)`;
- отсутствие глобальных переопределений типа `button {}`;
- отсутствие raw HEX/RGB и магических размеров при наличии token;
- реальные псевдосостояния через `:hover`, `:active`, `:focus-visible`.

## 5. JavaScript

JS создаётся только если компонент имеет поведение, которое нельзя выразить нативным HTML/CSS. Требуются несколько экземпляров на странице, keyboard support, корректное ARIA state, отсутствие зависимости от preview DOM.

## 6. Themes

Компонент не содержит отдельной Light/Dark реализации. Переключение темы меняет semantic tokens, но не структуру компонента.

## 7. Preview

Стандарт:

```text
Component name                     Light | Dark

Interactive component
[живая реализация]

---------------------------------------------

States matrix
[variants × sizes × states]
```

Interactive размещается первым.

## 8. README

В начале README:

```md
## Preview
▶ [Открыть живой Preview](https://andrewkz499.github.io/ALTA_IDE/components/<name>/preview.html)
```

Далее: Назначение, Files, Variants/API, States, Theming, Accessibility, ограничения/расхождения.

## 9. Figma analysis до реализации

Определить точный Component Set, variants, sizes, states, text/boolean properties, dependencies, semantic variables, icons/assets, размеры и Auto Layout. Связанные, но отдельные Component Set не смешиваются автоматически.

## 10. Accessibility

Проверяются semantic element, keyboard interaction, accessible name, необходимые `aria-*`, focus-visible и disabled/loading behavior.

## 11. Static state matrix

Forced-state wrappers допустимы только в `preview.html`. Они не заменяют реальные pseudo states в component CSS.

## 12. Versioning

После реализации обновить `docs/component-registry.md`, указать реальные states, статус `Ready` и version, затем сделать Conventional Commit.

## 13. Definition of Done

Figma проанализирована; path корректный; README + Preview существуют; Interactive сверху; States matrix ниже; Light/Dark работают; tokens применены; keyboard/accessibility проверены; `file://` работает; console без ошибок; registry обновлён.