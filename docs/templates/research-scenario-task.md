# Research Scenario Task Template

Шаблон технического задания на один исследовательский сценарий AltaIDE.

Используется до начала реализации прототипа. Цель — зафиксировать UX-гипотезу, пользовательскую задачу, экраны, необходимые DS-компоненты, gaps и критерии готовности.

## 1. Scenario ID

`<scenario-id>`

## 2. Название сценария

Краткое название пользовательского сценария.

## 3. UX-гипотеза

Что именно хотим проверить в юзер-тесте.

Формат:

> Если пользователь ..., то он сможет ..., потому что ...

## 4. Пользовательская задача

Что должен сделать респондент без технических подсказок.

## 5. Стартовое состояние

- Откуда начинается сценарий.
- Какие данные уже существуют.
- Какие значения выбраны по умолчанию.

## 6. Ожидаемый результат

Что должно произойти в конце успешного сценария.

## 7. Экраны

| Screen | Purpose | Entry condition | Exit action |
|---|---|---|---|
| `screen-01.html` |  |  |  |
| `screen-02.html` |  |  |  |

## 8. Component Inventory

Перед реализацией каждого экрана сопоставить элементы Figma с компонентами AltaIDE DS.

| Screen | Figma element | DS component | Status | Action |
|---|---|---|---|---|
|  |  |  | `Ready / Generated / Verifying / Planned` |  |

Правила:

- В research prototype использовать только `Ready` компоненты.
- Если компонент `Generated`, сначала провести verification.
- Если компонента нет, не рисовать его локально в prototype — зафиксировать gap.

## 9. Gap Analysis

Если gaps отсутствуют, указать `None`.

| Screen | Figma element | Missing component | Blocks scenario | Decision |
|---|---|---|---|---|
|  |  |  | `Yes / No` |  |

Gap-файл при необходимости:

`docs/gap/<scenario-id>.md`

## 10. State

Для каждого изменяемого состояния зафиксировать:

| State | Stored where | Read by | Changed by | Dependent UI |
|---|---|---|---|---|
|  |  |  |  |  |

Не вводить global state без необходимости. Для static HTML/CSS/JS достаточно локального Vanilla JS state.

## 11. Mock data

Если сценарий не требует backend, использовать отдельные mock-data:

`prototype-data.js`

или локальные файлы в `data/`.

Описать:

- какие данные нужны;
- какие состояния данных важны для теста;
- какие значения должны быть воспроизводимыми.

## 12. Interaction requirements

Отметить только релевантные сценарию взаимодействия:

- [ ] click
- [ ] input
- [ ] select
- [ ] keyboard navigation
- [ ] validation
- [ ] back
- [ ] retry
- [ ] repeated action
- [ ] loading
- [ ] empty
- [ ] error
- [ ] disabled
- [ ] invalid
- [ ] success

## 13. Visual QA

Проверить:

- [ ] композицию экрана относительно Figma;
- [ ] корректные DS-компоненты;
- [ ] semantic tokens;
- [ ] отсутствие локальных визуальных overrides компонентов;
- [ ] нужную тему Light/Dark по сценарию;
- [ ] responsive/viewport behavior, если релевантно.

## 14. Interaction QA

Проверить:

- [ ] happy path;
- [ ] релевантные edge cases;
- [ ] повторные действия;
- [ ] keyboard/focus;
- [ ] отсутствие ошибок в console;
- [ ] корректное восстановление/изменение state.

## 15. Research cleanup

Перед публикацией удалить или не допускать:

- developer/debug UI;
- Figma node IDs;
- технические заголовки;
- имена файлов;
- state matrix;
- missing-component explanations;
- theme switch, если тема не является предметом исследования.

## 16. Research Prototype Gate

### G1. Scenario — blocking

- [ ] гипотеза записана;
- [ ] пользовательская задача записана;
- [ ] end-to-end flow определён.

### G2. Visual Fidelity

- [ ] ключевые экраны визуально сверены с Figma.

### G3. Components

- [ ] используются только разрешённые `Ready` DS-компоненты;
- [ ] нет локальных копий/визуальных overrides компонентов.

### G4. Interaction — blocking

- [ ] критический flow работает полностью;
- [ ] обработаны релевантные ошибки и повторные действия.

### G5. States

- [ ] реализованы релевантные loading/empty/error/disabled/invalid/success states.

### G6. Research Cleanliness — blocking

- [ ] интерфейс не содержит developer/debug UI.

### G7. Reproducibility

- [ ] prototype commit зафиксирован;
- [ ] DS commit зафиксирован;
- [ ] URL зафиксирован;
- [ ] registry обновлён;
- [ ] tag создан при необходимости.

## 17. Definition of Done

Сценарий может получить статус `Research Ready`, если:

- [ ] гипотеза и пользовательская задача зафиксированы;
- [ ] все необходимые экраны существуют;
- [ ] flow проходит от старта до результата;
- [ ] критичные actions и релевантные states работают;
- [ ] используются только разрешённые DS-компоненты;
- [ ] gaps либо закрыты, либо явно не блокируют сценарий;
- [ ] prototype CSS не переопределяет визуальный слой компонентов;
- [ ] Visual QA пройден;
- [ ] Interaction QA пройден;
- [ ] keyboard/focus проверены для интерактивных контролов;
- [ ] console без критических ошибок;
- [ ] GitHub Pages URL работает;
- [ ] developer/debug UI отсутствует;
- [ ] `docs/prototypes-registry.md` обновлён;
- [ ] prototype commit и DS commit зафиксированы.

## 18. Publication metadata

- Prototype commit: `—`
- DS commit: `—`
- Tag: `—`
- GitHub Pages URL: `—`
- Status: `Draft`
- Test date: `—`
