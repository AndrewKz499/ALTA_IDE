(function () {
  function toNumber(value, fallback) {
    var n = Number(value);
    return isFinite(n) ? n : fallback;
  }

  function syncInvalid(root, input) {
    var min = input.getAttribute('min');
    var max = input.getAttribute('max');
    var value = toNumber(input.value, NaN);
    var invalid = isNaN(value);

    if (!invalid && min !== null) invalid = value < Number(min);
    if (!invalid && max !== null) invalid = value > Number(max);

    root.setAttribute('data-invalid', String(invalid));
    input.setAttribute('aria-invalid', String(invalid));

    var messageId = input.getAttribute('aria-describedby');
    if (messageId) {
      var message = document.getElementById(messageId);
      if (message) {
        message.textContent = invalid ? 'Значение вне допустимого диапазона.' : 'Используйте стрелки или введите число.';
      }
    }
  }

  function emitInput(input) {
    var event = document.createEvent('Event');
    event.initEvent('input', true, true);
    input.dispatchEvent(event);
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
    emitInput(input);
    input.focus();
  }

  function init(root) {
    var components = (root || document).querySelectorAll('.ds-input-number');
    var i;
    for (i = 0; i < components.length; i += 1) {
      (function (component) {
        if (component.getAttribute('data-input-number-ready') === 'true') return;
        component.setAttribute('data-input-number-ready', 'true');

        var input = component.querySelector('.ds-input-number__control');
        if (!input) return;

        var up = component.querySelector('.ds-input-number__step--up');
        var down = component.querySelector('.ds-input-number__step--down');

        if (up) up.addEventListener('click', function () { change(component, input, 1); });
        if (down) down.addEventListener('click', function () { change(component, input, -1); });
        input.addEventListener('input', function () { syncInvalid(component, input); });
        syncInvalid(component, input);
      })(components[i]);
    }
  }

  window.DSInputNumber = { init: init };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
})();