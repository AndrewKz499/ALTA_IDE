# Input Number

Числовое поле AltaIDE DS. Источник дизайна: Figma `AltaIDE/InputNumber`, node `185373:1753` внутри секции `Input Number`.

## Preview

▶ [Открыть живой Preview Input Number (Light / Dark)](https://andrewkz499.github.io/ALTA_IDE/components/input-number/preview.html)

## Назначение

`Input Number` используется для ввода числовых значений с ручным вводом и пошаговым увеличением/уменьшением через stepper-кнопки.

В секции Figma также существуют `InputNumberLabel` и `InputNumberDouble`. Это отдельные сущности и в базовую реализацию `Input Number` не включены.

## Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Каноническая разметка компонента |
| `input-number.css` | Стили через semantic tokens `--input-number-*` |
| `input-number.js` | Stepper, min/max и invalid-состояние |
| `preview.html` | Interactive сверху, затем states matrix и Light/Dark |
| `README.md` | Документация компонента |

## Размер

Figma: **104 × 28 px**.

- ширина компонента: 104 px;
- высота: `--num-28`;
- left padding: `--input-number-left-padding`;
- right padding: `--input-number-right-padding`;
- radius: `--input-number-radius`;
- border: `--input-number-border`.

## Каноническая разметка

```html
<div class="ds-input-number">
  <input
    class="ds-input-number__control"
    type="text"
    inputmode="decimal"
    value="0"
    step="1"
    aria-label="Числовое значение"
  />
  <span class="ds-input-number__steppers">
    <button class="ds-input-number__step ds-input-number__step--up" type="button" tabindex="-1" aria-label="Увеличить значение"></button>
    <button class="ds-input-number__step ds-input-number__step--down" type="button" tabindex="-1" aria-label="Уменьшить значение"></button>
  </span>
</div>
```

## Figma states → Web behavior

| Figma state | Реализация |
|---|---|
| `Default` | базовое заполненное поле |
| `Hover` | `:hover`, показываются stepper-кнопки |
| `Focused` | `:focus-within`, показываются stepper-кнопки |
| `FocusedBlue` | выделение текста через `::selection` |
| `Disabled` | `data-disabled="true"` + disabled input |
| `None` | пустое состояние без значения |
| `Invalid` | `data-invalid="true"` + `aria-invalid="true"` |
| `Hover_Invalid` | invalid сохраняет красную рамку при hover |
| `Focused_Invalid` | invalid сохраняет красную рамку при focus |

## Поведение

`input-number.js`:

- увеличивает/уменьшает значение на `step`;
- учитывает `min` и `max`;
- валидирует ручной ввод;
- выставляет `aria-invalid`;
- не требует npm или framework;
- написан без современного framework/runtime и работает в текущем статическом pipeline проекта.

В Preview для интерактивного примера задан демонстрационный диапазон `-10…10` и шаг `1`.

## Токены

Используются существующие semantic tokens из `tokens/tokens.css`:

- `--input-number-background-*`;
- `--input-number-border-*`;
- `--input-number-content-*`;
- `--input-number-arrows-*`;
- `--input-number-content-bg`;
- spacing/radius/border tokens семейства `--input-number-*`.

Light/Dark не имеют отдельных DOM или CSS-версий. Значения меняются через `data-theme` и `tokens/tokens.css`.

## Preview format

Единый формат с Button и Input:

1. заголовок + Light/Dark;
2. **Interactive component** сразу сверху;
3. разделитель;
4. **States matrix** ниже.

## Accessibility

- поле имеет accessible name;
- stepper-кнопки имеют `aria-label`;
- invalid отражается через `aria-invalid`;
- ручной ввод остаётся доступен с клавиатуры;
- стрелки не перехватывают tab-порядок, чтобы основной keyboard focus оставался на поле.

## Примечание по стрелкам

В Figma стрелки имеют геометрию 5×3 px внутри области 15×13 px. В коде эта геометрия воспроизведена CSS внутри stepper-кнопок, а цвет и border полностью берутся из semantic tokens.
