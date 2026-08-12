# Bottom Panel Prototype

Прототип нижней панели IDE по Figma node `203662:23908`.

## Preview

▶ [Открыть Bottom Panel Prototype](https://andrewkz499.github.io/ALTA_IDE/prototypes/bottom-panel/)

## Что использовано

Макет собран только из уже существующих компонентов AltaIDE DS в GitHub:

- `components/button/` — переключатель Light / Dark;
- `components/tabs/` — вкладка «Анализатор»;
- `components/badge/` — индикаторы ошибок / предупреждений / информации;
- `components/tabs-content/` — контейнер содержимого панели;
- глобальные semantic tokens из `tokens/tokens.css`.

Вертикальная панель иконок из Figma не добавлена, потому что отдельного соответствующего компонента в текущем наборе GitHub DS нет. Новые компоненты специально не создавались.

## Адаптивность

Прототип занимает доступную ширину viewport и изменяет высоту нижней панели через `clamp()` / viewport units. На узких и низких разрешениях уменьшаются отступы и высота панели без смены DOM-структуры.

## Темизация

Light / Dark переключаются через `document.documentElement.dataset.theme`. DOM макета и компоненты остаются теми же; меняются только semantic tokens.
