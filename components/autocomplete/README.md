# Inputs / Autocomplete

Доступный combobox AltaIDE DS с фильтрацией по подстроке. Компонент переиспользует разметку и стили `Inputs / Input`; локальной копии Input нет.

## Подключение

```html
<link rel="stylesheet" href="../../tokens/tokens.css">
<link rel="stylesheet" href="../input/input.css">
<link rel="stylesheet" href="./autocomplete.css">
<script src="./autocomplete.js"></script>
```

Каноническая разметка находится в `index.html`, интерактивный стенд — в `preview.html`.

## Данные и запуск

Источник данных — массив строк. Он передаётся при создании экземпляра:

```html
<script>
  var items = ["MyFun1", "MyFunction", "MyVar"];
  new DSAutocomplete(document.querySelector("#example-autocomplete"), items);
</script>
```

Каждому экземпляру нужны собственные `id` у input и listbox. Label связывается с полем через `for` / `id`, hint — через `aria-describedby`.

## Состояния

| Состояние | Представление |
|---|---|
| Closed / Open | `data-open="false"` / `data-open="true"` на `.ds-autocomplete` |
| Item Hover | `:hover` на `.ds-autocomplete__item` |
| Item Active | `aria-selected="true"` |
| Empty | видимый `.ds-autocomplete__empty`, когда совпадений нет |
| Error | `data-invalid="true"` на `.ds-input` и `aria-invalid="true"` на input |
| Disabled | нативный `disabled` на input |

Совпавшая подстрока выделяется элементом `.ds-autocomplete__match`. Список ограничен десятью строками по высоте и получает вертикальный скролл при большем числе результатов.

## Поведение

- непустой ввод открывает список и фильтрует строки регистронезависимо по подстроке;
- пустое поле всегда закрывает список;
- при отсутствии совпадений показывается состояние «Ничего не найдено»;
- `ArrowDown` / `ArrowUp` перемещают активный пункт циклически;
- `Enter` выбирает активный пункт;
- клик выбирает пункт, подставляет строку и возвращает фокус полю;
- `Escape` и клик вне компонента закрывают список без выбора;
- фокус во время навигации остаётся на input, активный option связан через `aria-activedescendant`.

Метод `destroy()` снимает обработчики экземпляра, если компонент удаляется динамически.

## Figma

Проверенный список имеет ширину 427 px и высоту 308 px: десять пунктов по 28 px плюс информационная строка 28 px. В макете подсвечиваются все найденные вхождения строки `My`; отдельного Figma-варианта Empty нет, поэтому состояние использует семантику информационной строки Autocomplete.
