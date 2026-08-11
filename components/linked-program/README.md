# Linked Program

## Preview

▶ [Открыть живой Preview](https://andrewkz499.github.io/ALTA_IDE/components/linked-program/preview.html)

## Назначение

Веб-реализация компонента **Linked Program** из AltaIDE DS. Компонент использует единую DOM-структуру для Light/Dark и семантические токены из `tokens/tokens.css`.

## Файлы

- `index.html` — канонический пример разметки;
- `linked-program.css` — стили компонента;
- `preview.html` — Interactive + States matrix + Light/Dark;
- `README.md` — документация.

## Темизация

Тема переключается атрибутом `data-theme="light|dark"` на `<html>`. Отдельные light/dark версии компонента не создаются.

## Accessibility

Используются нативные элементы и ARIA-роли там, где они необходимы интерактивному поведению. Проверяются keyboard focus и `:focus-visible`/нативный focus.

## Версия

`0.1` — первая рабочая web-реализация для визуальной сверки с AltaIDE DS.
