# AltaIDE research prototype structure

Каноническая структура исследовательского прототипа AltaIDE.

## Главное различие

**Component Preview ≠ Research Prototype**.

`components/<component-name>/preview.html` — техническая QA-страница компонента. В ней допустимы theme switch, states matrix, подписи variants/states и другие developer controls, которые помогают проверять компонент.

`prototypes/<scenario-id>/` — пользовательский сценарий для исследования. В нём не должно быть технического интерфейса, который не является частью исследуемого продукта.

## Каноническая структура сценария

```text
prototypes/<scenario-id>/
├── index.html
├── screen-01.html
├── screen-02.html
├── ...
├── prototype.css
├── prototype.js
├── prototype-data.js   # если нужны mock data
└── README.md
```

Не использовать `fetch()` для подгрузки локальных HTML-фрагментов: сценарий должен работать через `file://` и на GitHub Pages.

## Ответственность файлов

### `index.html`
Точка входа в сценарий. Должна открывать стартовый экран или содержать стартовую композицию сценария.

### `screen-XX.html`
Экран сценария как композиция существующих DS-компонентов.

Экран не должен локально копировать или переопределять визуальный слой reusable-компонента.

### `prototype.css`
Разрешено:

- layout страницы;
- grid/flex-композиция;
- positioning;
- viewport geometry;
- screen-specific composition.

Запрещено:

- копировать component CSS;
- менять visual styling DS-компонента;
- создавать локальную версию отсутствующего reusable-компонента.

### `prototype.js`
Хранит сценарную логику и изменения состояния между экранами.

Для каждого значимого state должно быть понятно:

- где он хранится;
- кто его читает;
- кто его изменяет;
- какой UI зависит от изменения.

Vanilla JS достаточен, пока исследовательская задача не требует иной архитектуры.

### `prototype-data.js`
Отдельные mock data сценария. Использовать при необходимости вместо смешивания данных с UI-разметкой и interaction logic.

### `README.md`
Минимально фиксирует:

- scenario ID;
- UX hypothesis;
- user task;
- список экранов;
- основной flow;
- component inventory или ссылку на него;
- известные gaps;
- текущий prototype status;
- prototype commit и DS commit перед Research Ready.

## Component Inventory

Перед сборкой каждого нового экрана определить соответствие:

```text
Figma element → DS component → Status → Action
```

Для research prototype разрешены только компоненты со статусом `Ready`.

Если компонент `Generated`, его сначала нужно верифицировать. Если компонента нет — зафиксировать gap в `docs/gap/<scenario-id>.md`; не дорисовывать компонент локально внутри prototype.

## Что запрещено в Research Prototype

Если это не является частью исследуемого пользовательского интерфейса, prototype не должен содержать:

- технические заголовки и developer notes;
- Figma node IDs;
- названия файлов и путей;
- states matrix;
- debug controls;
- объяснения отсутствующих компонентов;
- переключатель Light/Dark;
- QA-инструкции для разработчика.

Theme switch допустим только если переключение темы само является частью исследуемого сценария.

## Статусы прототипа

Использовать только статусы из `docs/prototypes-registry.md`:

- `Draft`;
- `Visual QA`;
- `Interaction QA`;
- `Research Ready`;
- `Tested`;
- `Archived`.

`Research Ready` не означает «страница открывается». Статус присваивается только после прохождения Research Prototype Gate и фиксации воспроизводимой версии сценария.

## Research Prototype Gate

Перед `Research Ready` проверить:

1. **Scenario** — есть гипотеза, user task и end-to-end flow.
2. **Visual Fidelity** — экраны сверены с актуальным Figma-сценарием.
3. **Components** — используются только разрешённые `Ready` компоненты, без локальных копий и visual overrides.
4. **Interaction** — работают click/input/select/keyboard/validation/back/retry/repeated actions, если они релевантны сценарию.
5. **States** — проверены применимые loading/empty/error/disabled/invalid/success.
6. **Research Cleanliness** — отсутствует developer/debug UI, не относящийся к исследованию.
7. **Reproducibility** — в registry зафиксированы prototype commit, DS commit, URL и status.

Блокирующие нарушения в Scenario, Interaction, Research Cleanliness или использовании неготовых DS-компонентов не позволяют присвоить `Research Ready`.

## Definition of Done для Research Ready

Сценарий готов к пользовательскому тесту только если:

- записаны hypothesis и user task;
- существуют все необходимые screens;
- flow проходится от старта до результата;
- критичные actions работают;
- используются только разрешённые DS-компоненты;
- gaps зафиксированы и не маскируются локальными реализациями;
- prototype CSS не переопределяет visual layer компонентов;
- Visual QA завершён;
- релевантные states проверены;
- keyboard/focus работает для интерактивных контролов;
- нет блокирующих console errors;
- сценарий работает на GitHub Pages;
- отсутствует лишний developer/debug UI;
- `docs/prototypes-registry.md` содержит prototype commit, DS commit, URL и `Research Ready`;
- версия, переданная на исследование, зафиксирована tag при необходимости.
