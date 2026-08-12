# AltaIDE — Interaction Specification

## 1. Назначение

Документ задаёт общие правила интерактивного поведения компонентов и прототипов. Конкретный Component Set использует только релевантные состояния.

## 2. State model

**Default** — базовое состояние.

**Hover** — только дополнительный pointer feedback; не единственный способ получить информацию или выполнить действие.

**Pressed / Active** — момент нажатия или активное действие; геометрия компонента не должна прыгать.

**Focused** — keyboard focus через `:focus-visible`.

**Selected / Checked / Expanded** — отражается визуально и семантически через native/ARIA state.

**Invalid** — визуальная ошибка + `aria-invalid="true"` для form controls + связанный error message при наличии.

**Loading** — предотвращает небезопасное повторное действие и не меняет размеры компонента.

**Disabled** — не инициирует действие; для native controls предпочтителен `disabled`.

## 3. Keyboard

Минимальные ожидания:

- `Tab` / `Shift+Tab` — переход по интерактивным элементам;
- `Enter` — основное действие там, где стандартно;
- `Space` — button/checkbox/toggle по native semantics;
- `Escape` — закрытие menu/popover/dialog-like UI;
- Arrow keys — listbox/menu/tab-like widgets, где это уместно.

## 4. Pointer

Clickable area соответствует визуальной зоне control. Невидимые кликабельные области, сильно выходящие за компонент, не используются.

## 5. Focus management

Popup/menu/listbox должны сохранять предсказуемый focus. При закрытии по Escape focus возвращается к связанному trigger, если ранее был перенесён внутрь.

## 6. Form validation

Валидация должна быть воспроизводима в Interactive Preview. Тестовые правила preview (например запрет цифр) не считаются продуктовым business rule, пока это явно не зафиксировано в component/product spec.

## 7. Popup/menu behavior

Общий паттерн: trigger → open, Escape/outside click → close, `aria-expanded` на trigger, выбор обновляет state, keyboard navigation при необходимости.

## 8. Theme switching

Preview theme switch меняет только `document.documentElement.dataset.theme`. Интерактивное состояние компонента при смене темы сохраняется, если возможно.

## 9. Resizing

Resizable UI имеет определённые min/max constraints. Визуальный resizer из Figma не считается draggable автоматически.

## 10. Dynamic text

Проверяются длинные строки, truncation/ellipsis, переносы, minimum width и отсутствие наложения текста/иконок.

## 11. Accessibility contract

Native semantics используются прежде ARIA. Icon-only action имеет accessible name. Decorative icon скрывается от accessibility tree.

## 12. Preview vs production behavior

Preview может содержать demo controls, forced states и тестовые данные. Они не должны становиться обязательной частью production component API.