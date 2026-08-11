# AltaIDE component structure

Каноническая структура переноса AltaIDE DS из Figma в GitHub.

## Правило соответствия

`Figma Component → GitHub directory → implementation → preview → documentation`

Новые компоненты создаются непосредственно в `components/<component-name>/` в `kebab-case`.

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

`preview.html` каждого реализованного компонента должен содержать переключатель Light / Dark, меняющий `document.documentElement.dataset.theme`, и показывать релевантные variants / states / sizes.

## Текущее исключение

`Button` был реализован ранее в `components/actions/button/` с контрактом `template.html` / `demo.html`. Его не перемещаем в рамках scaffolding-задачи, чтобы не ломать рабочий компонент и относительные пути. Миграцию в `components/button/` и `index.html` / `preview.html` выполнять отдельной задачей с проверкой demo/preview и ссылок.
