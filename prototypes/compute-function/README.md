# Compute Function Prototype

Интерактивный standalone-прототип AltaIDE по Figma nodes `21127:451709`, `21130:521108` и `21524:606238`.

## Preview

▶ [Открыть Compute Function Prototype](https://andrewkz499.github.io/ALTA_IDE/prototypes/compute-function/)

## Скачать

⬇ [Скачать standalone-прототип ZIP](https://github.com/AndrewKz499/ALTA_IDE/raw/refs/heads/main/prototypes/compute-function/altaide-compute-function-prototype.zip)

## Назначение

Базовая верстка экрана IDE для дальнейшей сборки кликабельного research-сценария. На текущем этапе интерфейс сверстан напрямую по Figma; готовность компонентов AltaIDE DS не является блокирующей.

## Возможности

- research-сценарий `initial → Compile Pressed → Project Build / Console` в одном DOM;
- Compile запускает simulated build state без настоящего compiler или backend;
- состояние кнопки Compile: `default → pressed → building`;
- Console автоматически открывается при переходе в `project-build`;
- в Console выводится mock build log из Figma;
- во время сборки в StatusBar отображается анимированный loader;
- изменение ширины Sidebar;
- изменение высоты нижней панели;
- переключение вкладок;
- выбор элементов дерева проекта;
- внутренний scroll таблицы и дерева;
- клавиатурное управление разделителями.

## Состояния сценария

- `initial / idle` — исходный экран, кнопка Compile в состоянии Default, нижняя панель закрыта;
- `compiling / pressed` — промежуточный визуальный кадр Pressed после клика, Enter или Space;
- `project-build / building` — открыта Console, видны mock build log и loader сборки;
- повторное нажатие в состоянии `building` не создаёт второй экземпляр Console и не запускает новый переход.

Состояние хранится только в памяти страницы в объекте `scenarioState`, а текст лога — в `scenarioData`. После перезагрузки прототип возвращается в `initial / idle`; backend-запросов, настоящей компиляции и перехода в success/error нет.

## Проверенные размеры

- 1200 × 800;
- 1364 × 900 — основной Figma reference;
- 1600 × 1000;
- 1920 × 1080.

## Статус

`Draft` — сценарий последовательно расширяется следующими состояниями. Перевод в `Research Ready` выполняется только после сборки и проверки всей цепочки.

## Техническое примечание

Страница не требует сборщика или runtime-зависимостей. SVG-иконки встроены в standalone-разметку. Локальные файлы шрифтов из исходного архива не публикуются; браузер использует системные fallback-шрифты.

## Формат публикации

Для GitHub Pages standalone-страница упакована в локальные `payload-*.js`: браузер распаковывает HTML через стандартный `DecompressionStream`. Внешние CDN и backend не используются.
