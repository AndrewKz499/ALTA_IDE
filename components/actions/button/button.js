/* =====================================================================
   Actions / Button (Primary) — поведение режима Loading
   Источник: Figma AltaIDE/ButtonPrimary (node 185100:882)

   Нативный <button> сам обрабатывает клик и Enter/Space — здесь только:
     • синхронизация aria-busy с data-state="loading";
     • блокировка активации (клик + Enter/Space), пока идёт загрузка;
     • dev-предупреждение, если data-icon="only" без доступного имени.

   Инициализирует ВСЕ экземпляры по классу .ds-button (без привязки к id).
   ===================================================================== */
(function () {
  "use strict";

  var SELECTOR = ".ds-button";

  function isBlocked(btn) {
    return btn.disabled || btn.getAttribute("data-state") === "loading";
  }

  function syncBusy(btn) {
    if (btn.getAttribute("data-state") === "loading") {
      btn.setAttribute("aria-busy", "true");
    } else {
      btn.removeAttribute("aria-busy");
    }
  }

  /** Публичный помощник: переключить состояние загрузки. */
  function setLoading(btn, on) {
    if (!btn) return;
    if (on) {
      btn.setAttribute("data-state", "loading");
    } else {
      btn.removeAttribute("data-state");
    }
    syncBusy(btn);
  }

  function guardClick(e) {
    if (isBlocked(e.currentTarget)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  function guardKey(e) {
    // Блокируем клавиатурную активацию во время загрузки.
    if ((e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
        e.currentTarget.getAttribute("data-state") === "loading") {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  function hasAccessibleName(btn) {
    if (btn.getAttribute("aria-label")) return true;
    if (btn.getAttribute("aria-labelledby")) return true;
    var label = btn.querySelector(".ds-button__label");
    return !!(label && label.textContent.trim());
  }

  function init(root) {
    var scope = root || document;
    var buttons = scope.querySelectorAll(SELECTOR);
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.__dsButtonInit) continue;
      btn.__dsButtonInit = true;

      syncBusy(btn);

      // Отражаем внешние изменения data-state в aria-busy.
      var observer = new MutationObserver(function (mutations) {
        for (var m = 0; m < mutations.length; m++) {
          syncBusy(mutations[m].target);
        }
      });
      observer.observe(btn, { attributes: true, attributeFilter: ["data-state"] });

      // Захватывающая фаза — чтобы опередить пользовательские обработчики.
      btn.addEventListener("click", guardClick, true);
      btn.addEventListener("keydown", guardKey, true);

      if (btn.getAttribute("data-icon") === "only" && !hasAccessibleName(btn)) {
        // Доступность: icon-only обязан иметь имя.
        if (window.console && console.warn) {
          console.warn('[ds-button] data-icon="only" без aria-label/aria-labelledby:', btn);
        }
      }
    }
  }

  // Экспорт API (без обязательности использования).
  window.DSButton = { init: init, setLoading: setLoading };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
})();
