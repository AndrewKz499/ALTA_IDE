# CLAUDE.md

Инструкции для ассистента (Claude) в этом репозитории.

## Главная цель проекта

Главный результат репозитория — интерактивные исследовательские прототипы AltaIDE, собранные из проверенных компонентов Design System.

Компоненты не являются конечной целью. Они являются reusable building blocks для экранов и пользовательских сценариев.

Каноническая цепочка:

**Tokens → Components → Screens → Scenarios → Research Prototype**

Прототип считается ценным только тогда, когда помогает проверить конкретную UX-гипотезу и может быть воспроизводимо передан респонденту.

## Порядок работы

Двигайся по цепочке:

1. **Tokens** (`tokens/`) — источник дизайн-значений.
2. **Components** (`components/`) — переиспользуемые элементы AltaIDE DS.
3. **Screens** (`prototypes/`) — композиции готовых компонентов для конкретного сценария.
4. **Scenarios** (`prototypes/`) — последовательности экранов и взаимодействий пользователя.
5. **Research Prototype** — опубликованная и проверенная версия сценария для юзер-теста.

Не верстай экран из локально придуманных компонентов и не подменяй отсутствующий DS-компонент screen-specific реализацией.

## Канонический контракт компонента

Единственный источник требований к структуре компонента:

`docs/component-structure.md`

Если другие документы конфликтуют с ним, приоритет имеет `docs/component-structure.md`.

Каноническая структура:

```text
components/<component-name>/
├── index.html
├── <component-name>.css
├── <component-name>.js       # только если требуется поведение
├── preview.html
└── README.md
```

Устаревшие `template.html` и `demo.html` не использовать как обязательный контракт.

## Соглашения

- **Один компонент — одна папка** внутри `components/`, с собственным `README.md`.
- Перед созданием или использованием компонента проверять `docs/component-registry.md`.
- Для research prototype использовать только компоненты со статусом `Ready`.
- Если компонент имеет статус `Generated`, сначала провести его проверку.
- Если нужного компонента нет — зафиксировать gap и остановить соответствующую часть сборки.
- **Семантические токены только через CSS-переменные** (`var(--token-name)`).
- Компоненты ссылаются на semantic tokens, а не на primitive напрямую.
- Цвета, borders, radius и typography в component CSS — только через tokens.
- Spacing/size — через tokens, если соответствующий токен существует.
- HEX/RGB/HSL literals и fallback HEX внутри `var()` в component CSS запрещены.
- Разметка и стили — статические HTML/CSS/JS, совместимые с GitHub Pages.

## Где что лежит

- `tokens/` — дизайн-токены.
- `components/` — переиспользуемые DS-компоненты.
- `prototypes/` — экраны и исследовательские сценарии.
- `references/` — референсы и выгрузки из Figma.
- `assets/` — иконки, изображения, шрифты.
- `docs/` — документация, registry, workflow и glossary.

## Обязательные правила

1. Перед сборкой экрана составлять Component Inventory: `Figma element → DS component → Status`.
2. Использовать в research prototype только `Ready` компоненты.
3. Если компонент `Generated` — сначала проверить его.
4. Если компонента нет — создать gap analysis и не дорисовывать его локально в prototype.
5. Не создавать локальные копии CSS компонентов внутри `prototypes/`.
6. Не менять разметку или визуальное оформление reusable-компонента через prototype CSS.
7. Prototype CSS отвечает только за layout, grid/flex, positioning, viewport geometry и screen-specific composition.
8. Использовать существующие semantic tokens; не создавать второй источник дизайн-значений внутри компонентов.
9. Все страницы должны работать через `file://` и на GitHub Pages.
10. Использовать только относительные URL; не использовать пути, начинающиеся с `/`.
11. Не использовать `fetch()` для подгрузки локальных HTML-фрагментов.
12. Сохранять клавиатурную навигацию и видимый `:focus-visible` для интерактивных контролов.
13. Использовать термины из `docs/glossary.md` в именах, комментариях и отчётах.
14. Не добавлять npm-пакеты, frontend-framework, backend или database без требования исследовательской задачи.
15. Research prototype не должен содержать developer/debug UI, Figma node ID, states matrix, технические подписи или переключатель Light/Dark, если тема не является предметом исследования.
16. После сборки экрана проверить релевантные interaction states.
17. После сборки сценария пройти его целиком от старта до результата.
18. Не ставить `Research Ready` без прохождения Research Prototype Gate.
19. Не реализовывать весь backlog компонентов заранее без сценарной потребности.

## CSS прототипа

Разрешено:

- layout страницы;
- grid/flex-композиция;
- positioning;
- размеры зон и viewport geometry;
- screen-specific composition.

Запрещено:

- менять внешний вид DS-компонентов;
- копировать CSS компонентов в `prototypes/`;
- создавать локальные версии reusable-компонентов.

## Research Prototype Definition of Done

Сценарий может считаться `Research Ready`, только если:

- записана гипотеза исследования;
- записана пользовательская задача;
- все необходимые экраны существуют;
- flow можно пройти от начала до результата;
- критичные действия и релевантные states работают;
- используются только разрешённые DS-компоненты;
- gaps зафиксированы и не искажают гипотезу;
- component CSS не переопределяется;
- визуальное соответствие проверено;
- keyboard/focus не ломают сценарий;
- нет console errors;
- prototype работает на GitHub Pages;
- отсутствует developer/debug UI;
- registry обновлён;
- зафиксированы prototype commit и DS commit;
- для версии реального исследования создан tag.

## Стиль коммитов

Использовать Conventional Commits. Заголовок — кратко, на английском, в нижнем регистре.

Примеры:

- `feat: add button component`
- `fix: correct spacing token in card`
- `docs: align research prototype workflow`
- `chore: add repository verifier`

Типы: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.
