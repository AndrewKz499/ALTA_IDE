# AltaIDE component structure

Каноническая структура переноса AltaIDE DS из Figma в GitHub.

## Правило соответствия

`Figma Component → GitHub directory → implementation → preview → documentation`

Новые компоненты создаются непосредственно в `components/<component-name>/` в `kebab-case`. Дополнительные группирующие директории вроде `actions/` не используются.

## Контракт реализованного компонента

```text
components/<component-name>/
├── index.html
├── <component-name>.css
├── <component-name>.js
├── preview.html
└── README.md
```

JS создаётся только если компоненту требуется поведение.

## Light / Dark

Компонент существует в одном экземпляре. Не создаются `light/`, `dark/`, `*-light.css` или `*-dark.css`.

Темизация выполняется семантическими токенами из `tokens/tokens.css` через:

```html
<html data-theme="light">
<html data-theme="dark">
```

Правило: **1 component → 1 DOM → 1 component CSS → 1 component JS → 2 themes through semantic tokens**.

`preview.html` каждого реализованного компонента обязан содержать переключатель Light / Dark, меняющий `document.documentElement.dataset.theme`, и показывать релевантные variants / states / sizes.

## Как смотреть компонент

Локально: открыть `components/<component-name>/preview.html` в браузере.

На GitHub Pages: открыть соответствующий путь `/components/<component-name>/preview.html`.
