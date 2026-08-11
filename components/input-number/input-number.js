(function () {
  function toNumber(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function syncInvalid(root, input) {
    var min = input.getAttribute('min');
    var max = input.getAttribute('max');
    var value = toNumber(input.value, NaN);
    var invalid = Number.isNaN(value);

    if (!invalid && min !== null) invalid = value < Number(min);
    if (!invalid && max !== null) invalid = value > Number(max);

    root.dataset.invalid = String(invalid);
    input.setAttribute('aria-invalid', String(invalid));

    var messageId = input.getAttribute('aria-describedby');
    if (messageId) {
      var message = document.getElementById(messageId);
      if (message) {
        message.textContent = invalid ? 'Значение вне допустимого диапазона.' : 'Используйте стрелки или введите число.';
      }
    }
  }

  function change(root, input, direction) {
    if (input.disabled) return;
    var step = toNumber(input.getAttribute('step'), 1);
    var value = toNumber(input.value, 0);
    var next = value + direction * step;
    var min = input.getAttribute('min');
    var max = input.getAttribute('max');
    if (min !== null) next = Math.max(next, Number(min));
    if (max !== null) next = Math.min(next, Number(max));
    input.value = String(next);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  }

  function init(root) {
    (root || document).querySelectorAll('.ds-input-number').forEach(function (component) {
      if (component.dataset.inputNumberReady === 'true') return;
      component.dataset.inputNumberReady = 'true';

      var input = component.querySelector('.ds-input-number__control');
      if (!input) return;

      var up = component.querySelector('.ds-input-number__step--up');
      var down = component.querySelector('.ds-input-number__step--down');

      if (up) up.addEventListener('click', function () { change(component, input, 1); });
      if (down) down.addEventListener('click', function () { change(component, input, -1); });
      input.addEventListener('input', function () { syncInvalid(component, input); });
      syncInvalid(component, input);
    });
  }

  window.DSInputNumber = { init: init };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
})();