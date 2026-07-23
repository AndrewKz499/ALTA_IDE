# Tokens

Дизайн-токены системы. **Источник истины — `source/*.tokens.json`** (экспорт переменных
Figma в формате DTCG). Файл [`tokens.css`](tokens.css) **сгенерирован** из них и вручную
не редактируется — при изменении JSON его нужно перегенерировать (см. «Регенерация»).

## Слои

Токены выстроены в два слоя: **примитивы → семантика**.

| Слой | Файл-источник | Что это |
| --- | --- | --- |
| **Primitives — числа** | `source/Source.tokens.json` | Шкала чисел, радиусы, границы, типографика (безымянные значения). |
| **Primitives — цвета** | `source/Color.tokens.json` | Палитры `Light` и `Dark`, семейства × ступени (hex). |
| **Semantic — Light** | `source/Light.tokens.json` | Роли компонентов в светлой теме (алиасы на примитивы). |
| **Semantic — Dark** | `source/Dark.tokens.json` | Те же роли в тёмной теме. |

- **Примитивы** — «сырые» значения без смысла (`--num-12`, `--color-dark-blue-7`).
  Объявлены один раз в `:root`, от темы не зависят; **обе** палитры (Light и Dark)
  присутствуют всегда.
- **Семантика** — 924 роли, привязанные к компонентам (`--buttons-primary-background-default`).
  Значение задаётся ссылкой на примитив: `var(--color-dark-blue-7)`. Компоненты и экраны
  используют **только семантические** переменные, напрямую к примитивам не обращаются.

## Правила именования

Все переменные — CSS custom properties в `kebab-case`, сегменты пути Figma соединяются
через `-`; семантика имён сохраняется 1:1 с Figma.

| Группа | Префикс | Пример |
| --- | --- | --- |
| Source — числа/размеры | `--num-*` | `--num-12`, `--num-size-32px` |
| Source — радиусы | `--radius-*` | `--radius-s`, `--radius-2xl` |
| Source — границы | `--border-*` | `--border-1px`, `--border-05px` |
| Source — типографика | `--font-size-*`, `--line-height-*`, `--font-weight-*`, `--font-family-*`, `--letter-spacing-*`, `--paragraph-spacing-*`, `--paragraph-indent-*` | `--font-size-2` |
| Color — примитивы | `--color-{light\|dark}-{семейство}-{ступень}` | `--color-light-blue-9` |
| Semantic | путь компонента как есть | `--buttons-primary-background-default` |

## Темизация

Тема переключается **только на семантическом слое**. По умолчанию активна **тёмная**.

Приоритет (от старшего к младшему): **`[data-theme]` → системная тема → Dark-база.**

```
:root                                              → Dark-семантика (база)
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) { … }                    → Light, если тему НЕ форсили атрибутом
}
:root[data-theme="light"] { … }                    → принудительный Light (побеждает систему)
:root[data-theme="dark"]  { … }                    → принудительный Dark  (побеждает систему)
```

Управление из разметки — атрибут на `<html>`:

```html
<html>                     <!-- Dark по умолчанию; при светлой ОС → Light -->
<html data-theme="light">  <!-- принудительно светлая -->
<html data-theme="dark">   <!-- принудительно тёмная -->
```

Блок `[data-theme="light"]` содержит только те токены, чьё значение в Light отличается
от Dark (648 из 924) — числовые/размерные токены между темами не меняются.

### Подключение

```html
<link rel="stylesheet" href="../tokens/tokens.css" />
```

```css
.button-primary {
  background: var(--buttons-primary-background-default);
  border-radius: var(--buttons-radius);
  padding: var(--buttons-primary-v-padding) var(--buttons-hpadding);
}
```

## Особые случаи

- **`$root`-токены.** В Figma есть переменные, чьё имя совпадает с именем группы
  (напр. переменная `Pagination/Border` = ширина рамки **и** группа `Pagination/Border`
  с цветами). Экспортёр кладёт такую переменную под ключ `$root`; в CSS она получает имя
  группы: `--pagination-border` (ширина, число), а цвета группы —
  `--pagination-border-default`, `--pagination-border-hover` и т.д.
- **Raw-токены** (7–8 шт., напр. `--buttons-secondary-v-padding`, `--icons-autocomplite-*`,
  `--table-cell-background-warning`) в Figma заданы литералом без алиаса — в CSS выводятся
  прямым значением с пометкой `/* raw */`. Один и тот же токен может быть raw в одной теме
  и алиасом в другой.
- **Кросс-модовые алиасы** (3 шт.): семантика одной темы ссылается на примитив другой
  палитры. Ссылка сохраняется (`var(--color-…)`), помечена комментарием — обе палитры
  всё равно объявлены в `:root`.
- **`--font-weight-*` / `--font-family-*`** несут строковые имена стилей из Figma
  (`"Medium"`, `"Rubik"`), а не числовые веса CSS — при использовании в компонентах может
  потребоваться маппинг на валидные значения `font-weight`.
- **Опечатки семейств** (`Fuchisa`, `Cian`) сохранены как в Figma, чтобы алиасы совпадали
  с источником.

## Регенерация

`tokens.css` собирается из `source/*.tokens.json` по правилам:

1. Примитивы `Source` → числовые переменные (значения в `px`, кроме строковых
   `font-weight`/`font-family`); `Color` → `--color-{light|dark}-*` (hex).
2. Семантика (`Light`/`Dark`) → для каждого токена берётся
   `$extensions.com.figma.aliasData.targetVariableName` и превращается в `var(--…)`
   на соответствующий примитив; при отсутствии алиаса — литерал из `$value`.
3. Dark — база в `:root`; Light-переопределения выводятся только для отличающихся значений
   по схеме приоритетов выше.

При обновлении переменных в Figma заменяются JSON в `source/`, после чего `tokens.css`
пересобирается тем же преобразованием. Вручную `tokens.css` не правят.
