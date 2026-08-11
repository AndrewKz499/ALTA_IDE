# Button

Кнопка AltaIDE DS. Канонический путь: `components/button/`.

## Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Эталонная разметка |
| `button.css` | Стили компонента через semantic tokens |
| `button.js` | Loading и accessibility helpers |
| `preview.html` | Визуальный стенд всех состояний с Light/Dark switch |
| `assets/icons/` | Исходники demo-иконок |

## Как посмотреть

Откройте `preview.html` в браузере. В правом верхнем углу находятся кнопки **Light** и **Dark**. Они меняют `document.documentElement.dataset.theme`, поэтому DOM и CSS самого Button остаются едиными, а цветовые значения переключаются через `tokens/tokens.css`.

На стенде показаны размеры L/M, состояния Default/Hover/Pressed/Loading/Disabled и варианты icon none/left/right/only.

## Темизация

Не создавать отдельные light/dark версии компонента. Button использует семантические переменные `--buttons-*`; значения выбираются глобальной темой.
