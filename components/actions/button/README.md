# Actions / Button (Primary)

Основная кнопка ALTA IDE. Источник: Figma **AltaIDE/ButtonPrimary** (node `185100:882`).

Один компонент `.ds-button` с осями «размер» и «иконка» и пятью состояниями. Все значения —
из [`tokens/tokens.css`](../../../tokens/tokens.css), без хардкода. Тема переключается на
уровне токенов (Dark — база); компонент цвета не фиксирует.

## Файлы

| Файл | Назначение |
| --- | --- |
| `template.html` | Референс-разметка всех вариантов. |
| `button.css` | Стили (все селекторы под `.ds-button`). |
| `button.js` | Только режим Loading: `aria-busy`, блокировка активации, dev-проверки. |
| `demo.html` | Сетка 40 клеток (2 размера × 5 состояний × 4 иконки). |
| `assets/icons/placeholder.svg` | Placeholder-иконка 16×16 (`currentColor`). |
| `assets/icons/spinner.svg` | Иконка спиннера 16×16 (`currentColor`). |

## API

### Оси (атрибуты на корне `.ds-button`)

| Атрибут | Значения | По умолчанию | Эффект |
| --- | --- | --- | --- |
| `data-size` | `l` \| `m` | `l` | `l` — текст 14/20 (высота 28); `m` — 12/16 (высота 24). |
| `data-icon` | `none` \| `left` \| `right` \| `only` | `none` | Размещение иконки. `only` — квадрат без текста. |

### Состояния

| Состояние | Как включить | Фон / текст (токены) |
| --- | --- | --- |
| Default | — | `…background-default` / `…content-default` |
| Hover | `:hover` | `…background-hover` |
| Pressed | `:active` | `…background-pressed` |
| Loading | `data-state="loading"` | `…background-loading` / `…content-loading` |
| Disabled | нативный `disabled` | `…background-disabled` / `…content-disabled` |

Focus (клавиатура) — через `:focus-visible`.

### Структура разметки

```html
<button class="ds-button" type="button" data-size="l" data-icon="left">
  <span class="ds-button__icon" aria-hidden="true"><!-- inline SVG --></span>
  <span class="ds-button__label">Кнопка</span>
  <span class="ds-button__spinner" aria-hidden="true"><!-- inline SVG --></span>
</button>
```

- `left` — иконка перед `__label`; `right` — после; `only` — только `__icon` (+ `aria-label`),
  без `__label`.
- `__spinner` — последний потомок, обязателен для корректного Loading.

## Поведение (button.js)

Нативный `<button>` сам активируется кликом и Enter/Space. Скрипт добавляет только:

- **Loading**: синхронизирует `aria-busy="true"` с `data-state="loading"`, блокирует клик и
  Enter/Space, пока идёт загрузка. Текст/иконку визуально заменяет спиннер (габариты
  сохраняются через `visibility: hidden`).
- **icon-only**: если нет `aria-label`/`aria-labelledby` и текста — предупреждение в консоль.
- Инициализирует **все** `.ds-button` по классу (без id). Доступен помощник:

```js
DSButton.setLoading(buttonEl, true);  // включить загрузку
DSButton.setLoading(buttonEl, false); // выключить
DSButton.init(container);             // проинициализировать динамически добавленные кнопки
```

## Иконки

Иконки — **inline-SVG** и наследуют цвет через `currentColor` (совпадает с `content`
состояния, в т.ч. серый спиннер в Loading). Исходники лежат в `assets/icons/*.svg`; в разметке
используются их inline-копии — это единственный способ применить `currentColor` без `fetch()`
и с работой через `file://` (см. «Расхождения» ниже). Своя иконка — замените содержимое
`.ds-button__icon` на нужный 16×16 SVG с `stroke`/`fill="currentColor"`.

## Токены

| Роль | Токен |
| --- | --- |
| Фон | `--buttons-primary-background-{default\|hover\|pressed\|loading\|disabled}` |
| Текст/иконка | `--buttons-primary-content-{default\|loading\|disabled}` |
| Радиус | `--buttons-radius` (4) |
| Паддинг гориз. | `--buttons-h-padding` (12) |
| Паддинг верт. | `--buttons-primary-v-padding` (4) |
| Зазор иконка↔текст | `--buttons-between-padding` (4) |
| Типографика | `--font-size-1`/`--line-height-0` (l), `--font-size-0`/`--line-height-7` (m), `--font-family-rubik`, `font-weight: 400` |
| Focus / offset | `--border-2px` |

Семейство берётся из токена `--font-family-rubik` (`"Rubik"`); сами начертания даёт
[`assets/fonts/fonts.css`](../../../assets/fonts/fonts.css) (`@font-face`, self-hosted TTF).
Его нужно подключить на странице **до** `tokens.css` (см. `demo.html`).

**Высота не хардкодится**: `line-height` + `padding-block` дают 28 (l) и 24 (m) сами;
`icon-only` берёт `aspect-ratio: 1`, высоту слота иконки держит `line-height`.

## Ограничения по дизайн-системе

- Все селекторы — под `.ds-button`; голые теги и `:root` не стилизуются.
- На корне нет `margin`; выравнивание — забота макета.
- Без фиксированных `id`, без фреймворков и npm; относительные пути; работа через `file://`.

## Расхождения со спецификацией / токенами

1. **Типографика — примитивы.** Семантических токенов шрифта для кнопки в `tokens.css` нет,
   поэтому размер/интерлиньяж/семейство взяты из примитивов (`--font-size-*`, `--line-height-*`,
   `--font-family-rubik`) — все из `tokens.css`, без сырых `px`.
2. **`font-weight: 400` задан числом.** Токены `--font-weight-rubik-*` содержат строковые
   имена стилей Figma (`"Medium"`), не валидные для CSS `font-weight`, поэтому вес указан
   числом (Regular = 400), как требует спецификация.
3. **Иконки inline, а не через `url()`.** Требования «из `assets/icons/`» + «`currentColor`» +
   «`file://` без `fetch`» одновременно выполнимы только inline-SVG. Файлы в `assets/icons/`
   — канонический источник, разметка содержит их inline-копии.
4. **Hover/Pressed в demo** показаны демо-обвязкой (класс `data-force` в `demo.html`),
   т.к. псевдоклассы статически не отрисовать; значения — те же токены. Сам компонент
   использует `:hover`/`:active`.
5. Токены `--buttons-primary-content-hover`/`-pressed` существуют и равны `content-default`
   (белый), поэтому для Default/Hover/Pressed используется `content-default`.
