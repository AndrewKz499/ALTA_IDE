# CFC Editor — reference layout

Этот каталог хранит **референс компоновки экрана CFC/FBD Editor** для AltaIDE.

Он нужен как визуальный и структурный ориентир при последующей сборке рабочего prototype из компонентов AltaIDE DS.

## Что зафиксировано

- верхний Menu Bar;
- командный Tool Bar;
- левый Sidebar Tree;
- вкладки открытых документов;
- Name Bar и строка «Таблица переменных»;
- рабочий CFC canvas с сеткой;
- toolbar canvas и zoom controls;
- примеры Function/Program nodes, ports и connection line;
- правая «Библиотека элементов»;
- нижняя панель Errors / Warnings;
- вертикальные и горизонтальные resize zones.

## Правила

- `references/` — **не runtime source of truth**.
- Не копировать стили отсюда в продуктовые компоненты.
- Рабочие экраны собираются в `prototypes/` из `components/`.
- Визуальные значения в этом примере берутся из `tokens/tokens.css` через semantic tokens.
- Если референс расходится с Figma Component Set или актуальным компонентом в `components/`, приоритет имеют Figma + DS component + tokens.

## Файлы

```text
index.html
reference.css
README.md
```

## Просмотр

GitHub Pages:

https://andrewkz499.github.io/ALTA_IDE/references/cfc-editor-example/
