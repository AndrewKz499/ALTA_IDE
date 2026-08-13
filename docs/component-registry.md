# Реестр компонентов

Источник правды о структуре и состоянии компонентов `components/`.

Канонический контракт и правила Light/Dark: [`component-structure.md`](component-structure.md).

## Статусы компонентов

Допустимые статусы:

- `Planned` — компонент нужен, но реализация ещё не создана.
- `Generated` — реализация существует, но ещё не прошла полную проверку.
- `Verifying` — компонент проходит техническую и визуальную верификацию.
- `Ready` — компонент прошёл обязательные проверки и разрешён для использования в research prototypes.
- `Deprecated` — компонент больше не должен использоваться в новых сценариях.

## Кто присваивает `Ready`

Статус `Ready` не присваивается автоматически после генерации кода.

Компонент может получить `Ready` только после завершённой верификации:

1. Coding agent / Codex реализует или исправляет компонент. После этого статус остаётся `Generated` или становится `Verifying`.
2. Automated verifier и code review проверяют структуру, semantic tokens, states, keyboard/focus, accessibility, отсутствие критических ошибок и совместимость с `file://` / GitHub Pages.
3. Visual QA подтверждает соответствие актуальному Figma-компоненту.
4. После прохождения всех обязательных проверок статус вручную меняется на `Ready` в этом реестре.

Финальное подтверждение `Ready` требует как технической, так и визуальной проверки. Сам coding agent не считается достаточным источником подтверждения.

## Критерии `Ready`

Компонент получает `Ready`, только если одновременно выполнены все применимые условия:

- структура соответствует `docs/component-structure.md`;
- реализация сверена с актуальным Figma-компонентом;
- используются semantic tokens и нет запрещённых визуальных hardcode-значений;
- реализованы необходимые variants / states;
- Light и Dark работают через semantic tokens;
- интерактивное поведение работает на happy path и релевантных edge cases;
- keyboard navigation и видимый `:focus-visible` работают для интерактивных контролов;
- нет критических accessibility-проблем;
- компонент работает через `file://`;
- компонент работает на GitHub Pages;
- компонент пригоден для повторного использования в research prototype без локального переопределения его визуального слоя.

Если хотя бы один блокирующий критерий не подтверждён, компонент не должен иметь статус `Ready`.

## Доказательство верификации

Для `Ready` обязательны заполненные поля:

- `Verified against Figma` — ссылка, node/component reference или однозначное имя актуального Figma-компонента;
- `Verified at` — дата последней полной верификации в формате `YYYY-MM-DD`.

Пустые значения `Verified against Figma` или `Verified at` означают, что статус `Ready` не подтверждён.

После существенного изменения DOM, component CSS, interaction logic, semantic token mapping или соответствующего Figma-компонента требуется повторная верификация. До её завершения статус должен быть `Verifying` или `Generated`.

## Реестр

| Figma | GitHub path | States | Status | Version | Verified against Figma | Verified at | Used in prototypes |
|---|---|---|---|---|---|---|---|
| Button | `components/button/` | Default, Hover, Pressed, Loading, Disabled; Light/Dark preview | Generated | 0.1 | — | — | — |
| Input | `components/input/` | Default_Placeholder, Default_Filled, Hover_Placeholder, Hover, Edit, EditBlue, Invalid, Hover_Invalid, Edit_Invalid, Disable; XL/L/M; Light/Dark preview | Generated | 0.1 | — | — | — |
| Label | `components/label/` | Base label; Light/Dark preview | Generated | 0.1 | — | — | — |
| Input Number | `components/input-number/` | Default, Hover, Focused, FocusedBlue, Disabled, None, Invalid, Hover_Invalid, Focused_Invalid; 104×28; Light/Dark preview | Generated | 0.1 | — | — | — |
| Clipboard and Hints | `components/clipboard-and-hints/` | Clipboard, Hints; Interactive + Light/Dark preview | Generated | 0.1 | — | — | — |
| Comments | `components/comments/` | Comments + CommentsBar; Light/Dark preview | Generated | 0.1 | — | — | — |
| Badge | `components/badge/` | Error, Info, Counter, Done; Light/Dark preview | Generated | 0.1 | — | — | — |
| Dropdown | `components/dropdown/` | L/M; Default, Selected, Focused, Invalid, Loading, Disable, FocusedFilled, Hover, HoverFilled, Hover_Invalid, Focused_Invalid | Generated | 0.1 | — | — | — |
| Autocomplete | `components/autocomplete/` | Default, Hover, Active, Info; keyboard navigation; Light/Dark preview | Verifying | 0.1 | — | — | — |
| Bit Mask Picker | `components/bit-mask-picker/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Calendar and Time Pickers | `components/calendar-and-time-pickers/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Segmented Control | `components/segmented-control/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Search | `components/search/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Pagination | `components/pagination/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Scroll | `components/scroll/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Textarea | `components/textarea/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Radio | `components/radio/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Toggle | `components/toggle/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Progress Bar | `components/progress-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tooltip Editor | `components/tooltip-editor/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tooltip Help | `components/tooltip-help/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Checkbox | `components/checkbox/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Banner | `components/banner/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Link | `components/link/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Shortcut | `components/shortcut/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tabs | `components/tabs/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Breadcrumb | `components/breadcrumb/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Notification | `components/notification/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Resize | `components/resize/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Context Menu | `components/context-menu/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Sidebar Tree | `components/sidebar-tree/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Sidebar Device Settings | `components/sidebar-device-settings/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Bottom Bar | `components/bottom-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Top Bar | `components/top-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Linked Program | `components/linked-program/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tool Bar | `components/tool-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tool Bar Vertical | `components/tool-bar-vertical/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Menu Bar | `components/menu-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Tabs Content | `components/tabs-content/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Status Bar | `components/status-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Name Bar | `components/name-bar/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| PLC | `components/plc/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Table | `components/table/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Subtitle | `components/subtitle/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Skeleton | `components/skeleton/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |
| Spinner | `components/spinner/` | Interactive component; States matrix; Light/Dark preview | Generated | 0.1 | — | — | — |

## Порядок реализации

Компоненты проверяются и доводятся до `Ready` по потребности конкретного research scenario, а не последовательно по всему backlog.
