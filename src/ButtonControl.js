import Controller from "./Controller";
import { createDom } from "./utils/dom";

export default class ButtonController extends Controller {
  constructor(parent, object, property) {
    super(parent, object, property, "boolean", "div");

    this.$button = createDom("button");
    this.$button.textContent = this.$name.textContent;
    // this.$input.setAttribute("type", "checkbox");
    // this.$input.setAttribute("aria-labelledby", this.$name.id);

    this.$widget.appendChild(this.$button);

    this.$button.addEventListener("click", () => {
      if (this.onClick) {
        this.onClick.call(this);
      }
    });

    this.$disable = this.$button;

    this.updateDisplay();
  }

  updateDisplay() {
    // this.$input.checked = this.getValue();
    return this;
  }

  label(label) {
    if (this.$button) {
      this.$button.textContent = label;
    }
    return this;
  }

  onClick(callback) {
    this.onClick = callback;
    return this;
  }
}
