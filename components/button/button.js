/* AltaIDE DS / Button — Loading behavior and accessibility helpers */
(function () {
  "use strict";

  var SELECTOR = ".ds-button";

  function isBlocked(btn) {
    return btn.disabled || btn.getAttribute("data-state") === "loading";
  }

  function syncBusy(btn) {
    if (btn.getAttribute("data-state") === "loading") btn.setAttribute("aria-busy", "true");
    else btn.removeAttribute("aria-busy");
  }

  function setLoading(btn, on) {
    if (!btn) return;
    if (on) btn.setAttribute("data-state", "loading");
    else btn.removeAttribute("data-state");
    syncBusy(btn);
  }

  function guardClick(e) {
    if (isBlocked(e.currentTarget)) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  function guardKey(e) {
    if ((e.key === "Enter" || e.key === " " || e.key === "Spacebar") &&
        e.currentTarget.getAttribute("data-state") === "loading") {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  function hasAccessibleName(btn) {
    if (btn.getAttribute("aria-label") || btn.getAttribute("aria-labelledby")) return true;
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

      var observer = new MutationObserver(function (mutations) {
        for (var m = 0; m < mutations.length; m++) syncBusy(mutations[m].target);
      });
      observer.observe(btn, { attributes: true, attributeFilter: ["data-state"] });

      btn.addEventListener("click", guardClick, true);
      btn.addEventListener("keydown", guardKey, true);

      if (btn.getAttribute("data-icon") === "only" && !hasAccessibleName(btn) && window.console && console.warn) {
        console.warn('[ds-button] data-icon="only" без aria-label/aria-labelledby:', btn);
      }
    }
  }

  window.DSButton = { init: init, setLoading: setLoading };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
})();
