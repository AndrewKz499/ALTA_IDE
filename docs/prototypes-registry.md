# Реестр прототипов

Источник правды о версиях исследовательских сценариев, их воспроизводимости и статусе готовности к юзер-тестам.

## Статусы прототипов

Допустимые статусы:

- `Draft` — сценарий или композиция существует, но ещё не прошла обязательные QA-gates.
- `Visual QA` — проверяется визуальное соответствие Figma и корректность композиции экранов.
- `Interaction QA` — проверяется end-to-end flow, состояния, ошибки и повторные действия.
- `Research Ready` — сценарий прошёл Research Prototype Gate и может использоваться в юзер-тесте.
- `Tested` — сценарий уже использовался в исследовании.
- `Archived` — версия больше не является актуальной для новых тестов.

Статус `Ready` для прототипов не используется.

## Правило `Research Ready`

Прототип получает `Research Ready` только после прохождения Research Prototype Gate: подтверждены гипотеза и пользовательская задача, собран полный flow, используются допустимые DS-компоненты, проверены релевантные states и interactions, выполнены visual/interaction QA, удалён developer/debug UI, а версия воспроизводима по commit/tag/URL.

Технические composition examples и PoC не считаются `Research Ready`, пока не оформлены как полноценный исследовательский сценарий.

## Реестр

| ID | Scenario | Hypothesis | Prototype commit | DS commit | Tag | URL | Status | Test date |
|---|---|---|---|---|---|---|---|---|
| BP-01 | Bottom Panel / Анализатор | Нижнюю панель можно собрать из существующих компонентов DS без создания новых компонентов | `52390883` | — | — | https://andrewkz499.github.io/ALTA_IDE/prototypes/bottom-panel/ | Draft | — |
| CF-01 | Compute Function / базовый экран | — | `cd32c9a8` | — | — | https://andrewkz499.github.io/ALTA_IDE/prototypes/compute-function/ | Draft | — |

## Правила заполнения

- `Prototype commit` — commit, фиксирующий конкретную версию сценария.
- `DS commit` — commit дизайн-системы/компонентов, относительно которого собран и проверен сценарий.
- `Tag` — фиксированная метка исследовательской версии, если она создана.
- `URL` — опубликованный URL конкретного прототипа на GitHub Pages.
- `Test date` заполняется после проведения исследования.
- Перед присвоением `Research Ready` должны быть заполнены как минимум `ID`, `Scenario`, `Hypothesis`, `Prototype commit`, `DS commit`, `URL` и `Status`.
