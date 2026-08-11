# Button

Кнопка AltaIDE DS. Канонический путь: `components/button/`.

## Preview

[▶ Открыть живой Preview Button (Light / Dark)](https://andrewkz499.github.io/ALTA_IDE/components/button/preview.html)

В Preview показаны размеры L/M, состояния Default/Hover/Pressed/Loading/Disabled и варианты icon none/left/right/only. Переключатель **Light / Dark** меняет `document.documentElement.dataset.theme`, поэтому DOM и CSS Button остаются едиными, а цветовые значения переключаются через `tokens/tokens.css`.

## Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Эталонная разметка |
| `button.css` | Стили компонента через semantic tokens |
| `button.js` | Loading и accessibility helpers |
| `preview.html` | Живой визуальный стенд компонента с Light/Dark switch |
| `assets/icons/` | Исходники demo-иконок |

## Работа компонента

### Размеры

- `data-size="l"` — размер L, типографика 14/20.
- `data-size="m"` — размер M, типографика 12/16.

### Иконки

- `data-icon="none"` — без иконки.
- `data-icon="left"` — иконка слева.
- `data-icon="right"` — иконка справа.
- `data-icon="only"` — только иконка; требуется `aria-label` или `aria-labelledby`.

### Состояния

| Состояние | Реализация |
|---|---|
| Default | Базовое состояние |
| Hover | `:hover` |
| Pressed | `:active` |
| Loading | `data-state="loading"`; JS синхронизирует `aria-busy` и блокирует активацию |
| Disabled | Нативный `disabled` |
| Focus | `:focus-visible` |

## Темизация

Не создавать отдельные Light/Dark версии компонента. Button использует семантические переменные `--buttons-*`; значения выбираются глобальной темой из `tokens/tokens.css`.

Правило: **1 component → 1 DOM → 1 CSS → Light/Dark через semantic tokens**.
