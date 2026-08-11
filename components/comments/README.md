# Comments

Семейство комментариев AltaIDE DS из Figma section `198526:44652`.

## Preview

▶ [Открыть живой Preview Comments (Light / Dark)](https://andrewkz499.github.io/ALTA_IDE/components/comments/preview.html)

Preview использует единый формат проекта: **Interactive component сверху → States matrix ниже → Light/Dark**.

## Состав

В одном Figma-разделе находятся два связанных Component Set, поэтому они реализованы совместно в `components/comments/`:

- `AltaIDE/Comments` — многострочный редактор комментария с label и resize handle;
- `AltaIDE/CommentsBar` — строка добавления/просмотра комментария с состояниями свернут/развернут.

## Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Каноническая разметка |
| `comments.css` | Стили Comments и CommentsBar через semantic tokens |
| `comments.js` | Resize для Comments и интерактив CommentsBar |
| `preview.html` | Interactive + матрицы состояний + Light/Dark |
| `assets/*.svg` | Точные векторные контуры иконок из Figma |

## Comments

Размер Component Set в Figma: **792 × 70 px**. Само поле имеет высоту **48 px**, label — Rubik 14/20, расстояние label → field — `--labels-v-between`.

### States

`Default_Placeholder`, `Default_Filled`, `Hover`, `HoverFilled`, `Focused`, `Invalid`, `Hover_Invalid`, `Focused_Invalid`, `Disabled`.

В веб-реализации реальные `hover`, `focus`, `disabled` работают нативно. Invalid задается через `data-invalid="true"` на `.ds-comments` и может сопровождаться `aria-invalid="true"` у textarea в продуктовой интеграции.

### Пример

```html
<label class="ds-comments">
  <span class="ds-comments__label">Комментарий</span>
  <span class="ds-comments__field">
    <textarea
      class="ds-comments__control"
      placeholder="Введите комментарий"
      aria-label="Комментарий"
    ></textarea>
    <button class="ds-comments__resize" type="button" tabindex="-1" aria-hidden="true"></button>
  </span>
</label>
```

## CommentsBar

Размер базовой строки Figma: **1108 × 40 px**; открытые варианты — **1108 × 60 px**.

### Types

- `Plus` — label + кнопка добавления;
- `Active` — активный редактор в строке;
- `Comment` — сохраненный комментарий в одну строку;
- `ActiveOpen` — открытый редактор высотой 60 px;
- `CommentOpen` — раскрытый сохраненный комментарий.

В интерактивном preview: `Plus` открывает редактор, `Enter` сохраняет комментарий, стрелка переключает свернутое/развернутое состояние. `Shift+Enter` остается переносом строки.

## Tokens

Используются существующие semantic tokens из `tokens/tokens.css`:

- `--comments-*`;
- `--comments-bar-*`;
- `--labels-*`;
- `--icons-plus-*`, `--icons-arrow-*`, `--icons-resize-*`.

Light/Dark переключаются только значениями токенов через `data-theme`; DOM и CSS компонента не дублируются.

## Assets

`resize.svg`, `plus.svg`, `arrow.svg` построены из точных `vectorPaths` и transform-матриц исходных Figma icon components, а не из приближенных вручную нарисованных glyphs.

## Accessibility

- редактор использует нативный `<textarea>`;
- interactive controls — нативные `<button>`;
- кнопки CommentsBar имеют accessible names;
- `disabled` у textarea остается нативным;
- focus отображается через реальный `:focus`/`:focus-visible`;
- resize handle исключен из tab order, поскольку это вспомогательная pointer-механика.

## Расхождения / решения

1. Figma хранит Comments и CommentsBar как два Component Set внутри одного раздела `Comments`; в GitHub они намеренно объединены в один компонентный каталог, поскольку являются одной функциональной сущностью.
2. Preview-only принудительные hover/focus/invalid состояния не входят в `comments.css`.
3. В продуктовой интеграции правило, когда комментарий считается Invalid, должно задаваться бизнес-логикой; дизайн определяет вид состояния, но не критерий валидации.
