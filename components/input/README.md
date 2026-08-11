# Input

Компонент текстового поля AltaIDE DS. Источник дизайна: Figma `AltaIDE/Input`, node `185124:25`.

## Preview

▶ [Открыть живой Preview Input (Light / Dark)](https://andrewkz499.github.io/ALTA_IDE/components/input/preview.html)

## Назначение

`Input` используется для ввода однострочного текста. Компонент основан на нативном `<input type="text">`, поэтому сохраняет стандартное поведение клавиатуры, выделения текста, курсора и ввода.

`InputIcons` и `InputLabel` в Figma являются отдельными Component Set и в эту реализацию не включены.

## Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Эталонная разметка и базовые примеры |
| `input.css` | Стили компонента через semantic tokens `--input-*` |
| `preview.html` | Живой визуальный стенд всех состояний с Light/Dark switch |
| `README.md` | Документация компонента в GitHub |

Отдельный `input.js` не требуется: базовая интерактивность обеспечивается нативным HTML input.

## Размеры

| `data-size` | Ширина в Figma | Высота control |
|---|---:|---:|
| `xl` | 302px | 28px |
| `l` | 248px | 28px |
| `m` | 162px | 28px |

Ширины 302/248/162px зафиксированы непосредственно в Figma и не имеют отдельных semantic size tokens в текущем `tokens.css`, поэтому сохранены как компонентные размеры. Высота использует `--num-28`.

## Структура

```html
<label class="ds-input" data-size="l">
  <input
    class="ds-input__control"
    type="text"
    placeholder="Text"
    aria-describedby="example-hint"
  />
  <span class="ds-input__hint" id="example-hint">Hint text</span>
</label>
```

Invalid:

```html
<label class="ds-input" data-size="l" data-invalid="true">
  <input
    class="ds-input__control"
    type="text"
    value="Text"
    aria-invalid="true"
    aria-describedby="example-error"
  />
  <span class="ds-input__hint" id="example-error">Hint text</span>
</label>
```

## Figma states → Web behavior

| Figma state | Реализация |
|---|---|
| `Default_Placeholder` | пустой input + `placeholder` |
| `Default_Filled` | input с value |
| `Hover_Placeholder` | `:hover` у пустого input |
| `Hover` | `:hover` у заполненного input |
| `Edit` | нативный `:focus` / `:focus-visible` |
| `EditBlue` | нативное выделение текста через `::selection` |
| `Invalid` | `data-invalid="true"` + `aria-invalid="true"` |
| `Hover_Invalid` | invalid остаётся красным при `:hover` |
| `Edit_Invalid` | invalid остаётся красным при `:focus` |
| `Disable` | нативный `disabled` |

В `preview.html` hover/focus состояния дополнительно показаны статически demo-обвязкой, чтобы вся Figma-матрица была видна одновременно. Эти demo-классы не входят в `input.css`.

## Токены

Компонент использует semantic tokens семейства `--input-*` из `tokens/tokens.css`:

- `--input-h-padding`, `--input-v-padding`, `--input-radius`, `--input-between`, `--input-border`;
- `--input-background-*`;
- `--input-content-*`;
- `--input-border-*`;
- `--input-hint`;
- `--input-content-bg` для выделенного текста.

Произвольные цвета в CSS компонента не используются.

## Light / Dark

Одна DOM-структура и один `input.css` работают в обеих темах. Тема переключается глобально:

```html
<html data-theme="light">
```

или:

```html
<html data-theme="dark">
```

`tokens/tokens.css` подменяет значения semantic tokens. В `preview.html` переключатель Light/Dark меняет `document.documentElement.dataset.theme` без перезагрузки.

## Accessibility

- используется нативный `<input type="text">`;
- hint связывается с полем через `aria-describedby`;
- invalid-состояние передаётся через `aria-invalid="true"`;
- disabled — нативный атрибут `disabled`;
- клавиатурный focus использует нативный `:focus-visible`;
- выделение текста остаётся нативным и стилизуется через `::selection`.

## Расхождения и решения

1. Figma моделирует `Edit` и `EditBlue` отдельными variants. В web это не отдельные API-состояния: `Edit` соответствует focus, а `EditBlue` — выделению текста пользователем. Это сохраняет нативное поведение поля.
2. Размеры XL/L/M имеют фиксированные ширины 302/248/162px в Component Set; отдельных semantic width tokens в текущем token export нет.
3. `InputIcons` и `InputLabel` не объединены с базовым `Input`, потому что в Figma они являются отдельными Component Set и должны реализовываться отдельно.
