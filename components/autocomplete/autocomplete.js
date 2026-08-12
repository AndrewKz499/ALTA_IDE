(function () {
  "use strict";

  var scriptUrl = document.currentScript && document.currentScript.src;
  var assetBase = scriptUrl ? new URL("./assets/", scriptUrl).href : "./assets/";
  var instanceCount = 0;

  function normalize(value) {
    return value.toLocaleLowerCase();
  }

  function iconName(value) {
    var normalized = normalize(value);

    if (normalized.includes("function")) {
      return "function.png";
    }

    if (normalized.includes("nt")) {
      return "enum.png";
    }

    return "variable.png";
  }

  function appendHighlightedText(target, value, query) {
    var index = normalize(value).indexOf(normalize(query));

    if (index < 0 || query.length === 0) {
      target.append(document.createTextNode(value));
      return;
    }

    target.append(document.createTextNode(value.slice(0, index)));

    var mark = document.createElement("mark");
    mark.className = "ds-autocomplete__match";
    mark.textContent = value.slice(index, index + query.length);
    target.append(mark, document.createTextNode(value.slice(index + query.length)));
  }

  function DSAutocomplete(root, items) {
    if (!(root instanceof HTMLElement)) {
      throw new TypeError("DSAutocomplete requires a root HTMLElement.");
    }

    this.root = root;
    this.input = root.querySelector(".ds-autocomplete__control");
    this.listbox = root.querySelector(".ds-autocomplete__popup");
    this.options = root.querySelector(".ds-autocomplete__options");
    this.empty = root.querySelector(".ds-autocomplete__empty");
    this.items = Array.isArray(items) ? items.map(String) : [];
    this.filteredItems = [];
    this.activeIndex = -1;
    this.instanceId = ++instanceCount;

    if (!this.input || !this.listbox || !this.options || !this.empty) {
      throw new Error("DSAutocomplete markup is incomplete.");
    }

    if (!this.listbox.id) {
      this.listbox.id = "ds-autocomplete-listbox-" + this.instanceId;
    }

    this.input.setAttribute("role", "combobox");
    this.input.setAttribute("aria-autocomplete", "list");
    this.input.setAttribute("aria-controls", this.listbox.id);
    this.input.setAttribute("aria-expanded", "false");
    this.listbox.setAttribute("role", "listbox");

    this.onInput = this.handleInput.bind(this);
    this.onKeydown = this.handleKeydown.bind(this);
    this.onOptionClick = this.handleOptionClick.bind(this);
    this.onOptionPointerdown = function (event) {
      event.preventDefault();
    };
    this.onDocumentPointerdown = this.handleDocumentPointerdown.bind(this);

    this.input.addEventListener("input", this.onInput);
    this.input.addEventListener("keydown", this.onKeydown);
    this.options.addEventListener("click", this.onOptionClick);
    this.options.addEventListener("pointerdown", this.onOptionPointerdown);
    document.addEventListener("pointerdown", this.onDocumentPointerdown);

    this.close();
  }

  DSAutocomplete.prototype.filter = function (query) {
    var normalizedQuery = normalize(query);
    return this.items.filter(function (item) {
      return normalize(item).includes(normalizedQuery);
    });
  };

  DSAutocomplete.prototype.render = function (query) {
    var self = this;
    this.filteredItems = this.filter(query);
    this.activeIndex = -1;
    this.options.replaceChildren();

    this.filteredItems.forEach(function (value, index) {
      var option = document.createElement("div");
      option.className = "ds-autocomplete__item";
      option.id = "ds-autocomplete-option-" + self.instanceId + "-" + index;
      option.dataset.index = String(index);
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");

      var main = document.createElement("span");
      main.className = "ds-autocomplete__item-main";

      var icon = document.createElement("span");
      icon.className = "ds-autocomplete__icon";
      icon.setAttribute("aria-hidden", "true");

      var image = document.createElement("img");
      image.src = assetBase + iconName(value);
      image.alt = "";
      icon.append(image);

      var visibleValue = document.createElement("span");
      visibleValue.className = "ds-autocomplete__value";

      var name = document.createElement("span");
      name.className = "ds-autocomplete__name";
      appendHighlightedText(name, value, query);

      var signature = document.createElement("span");
      signature.className = "ds-autocomplete__signature";
      signature.textContent = "(VAR1, VAR2)";

      var type = document.createElement("span");
      type.className = "ds-autocomplete__type";
      type.textContent = "DWORD";

      visibleValue.append(name, signature);
      main.append(icon, visibleValue);
      option.append(main, type);
      self.options.append(option);
    });

    this.empty.hidden = this.filteredItems.length !== 0;
    this.input.removeAttribute("aria-activedescendant");
  };

  DSAutocomplete.prototype.setOpen = function (open) {
    var shouldOpen = Boolean(open) && !this.input.disabled;
    this.root.dataset.open = String(shouldOpen);
    this.listbox.hidden = !shouldOpen;
    this.input.setAttribute("aria-expanded", String(shouldOpen));

    if (!shouldOpen) {
      this.setActive(-1);
    }
  };

  DSAutocomplete.prototype.open = function () {
    var query = this.input.value.trim();

    if (!query) {
      this.close();
      return;
    }

    this.render(query);
    this.setOpen(true);
  };

  DSAutocomplete.prototype.close = function () {
    this.setOpen(false);
  };

  DSAutocomplete.prototype.setActive = function (index) {
    var options = this.options.querySelectorAll(".ds-autocomplete__item");
    this.activeIndex = index;

    options.forEach(function (option, optionIndex) {
      option.setAttribute("aria-selected", String(optionIndex === index));
    });

    if (index < 0 || !options[index]) {
      this.input.removeAttribute("aria-activedescendant");
      return;
    }

    this.input.setAttribute("aria-activedescendant", options[index].id);
    options[index].scrollIntoView({ block: "nearest" });
  };

  DSAutocomplete.prototype.moveActive = function (step) {
    var count = this.filteredItems.length;

    if (count === 0) {
      return;
    }

    var nextIndex = this.activeIndex + step;

    if (nextIndex < 0) {
      nextIndex = count - 1;
    } else if (nextIndex >= count) {
      nextIndex = 0;
    }

    this.setActive(nextIndex);
  };

  DSAutocomplete.prototype.select = function (index) {
    var value = this.filteredItems[index];

    if (typeof value !== "string") {
      return;
    }

    this.input.value = value;
    this.close();
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  DSAutocomplete.prototype.handleInput = function () {
    if (!this.input.value.trim()) {
      this.close();
      this.options.replaceChildren();
      this.empty.hidden = true;
      return;
    }

    this.open();
  };

  DSAutocomplete.prototype.handleKeydown = function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (this.root.dataset.open !== "true") {
        this.open();
      }

      this.moveActive(event.key === "ArrowDown" ? 1 : -1);
      return;
    }

    if (event.key === "Enter" && this.root.dataset.open === "true" && this.activeIndex >= 0) {
      event.preventDefault();
      this.select(this.activeIndex);
      return;
    }

    if (event.key === "Escape" && this.root.dataset.open === "true") {
      event.preventDefault();
      this.close();
    }
  };

  DSAutocomplete.prototype.handleOptionClick = function (event) {
    var option = event.target.closest(".ds-autocomplete__item");

    if (option && this.options.contains(option)) {
      this.select(Number(option.dataset.index));
      this.input.focus();
    }
  };

  DSAutocomplete.prototype.handleDocumentPointerdown = function (event) {
    if (!this.root.contains(event.target)) {
      this.close();
    }
  };

  DSAutocomplete.prototype.destroy = function () {
    this.input.removeEventListener("input", this.onInput);
    this.input.removeEventListener("keydown", this.onKeydown);
    this.options.removeEventListener("click", this.onOptionClick);
    this.options.removeEventListener("pointerdown", this.onOptionPointerdown);
    document.removeEventListener("pointerdown", this.onDocumentPointerdown);
  };

  window.DSAutocomplete = DSAutocomplete;
}());
