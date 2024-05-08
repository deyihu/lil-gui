import Controller from "./Controller";
import { createDom } from "./utils/dom";

function getSelectImages(el) {
  const files = Array.prototype.slice.call(el.files || []);
  const imgFile = files.filter(function (file) {
    return file.type.match(/image/);
  })[0];
  return imgFile;
}

export default class ImageController extends Controller {
  constructor(parent, object, property) {
    super(parent, object, property, "image", "div");

    this.$image = createDom("img");
    this.$image.className = "image-icon";
    // this.$input.setAttribute( 'type', 'checkbox' );
    // this.$input.setAttribute( 'aria-labelledby', this.$name.id );

    const selectbtn = (this.selectbtn = createDom("button"));
    selectbtn.textContent = "select";
    selectbtn.className = "image-btn";

    const clearbtn = (this.clearbtn = createDom("button"));
    clearbtn.textContent = "X";
    clearbtn.className = "image-btn";
    clearbtn.classList.add("lil-close-btn");

    this.$widget.appendChild(this.$image);
    this.$widget.appendChild(selectbtn);
    this.$widget.appendChild(clearbtn);

    clearbtn.addEventListener("click", () => {
      this.setValue("");
      this._callOnFinishChange();
    });

    selectbtn.addEventListener("click", () => {
      const inputFile = createDom("input");
      inputFile.type = "file";
      //   inputFile.accept = '.png,.jpe,.jpeg,.webp,.svg,.gif';
      inputFile.addEventListener("change", () => {
        if (inputFile.files.length) {
          const imageFile = getSelectImages(inputFile);
          if (imageFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              this.setValue(fileReader.result);
              this._callOnFinishChange();
            };
            fileReader.readAsDataURL(imageFile);
          }
        }
      });
      inputFile.click();
    });

    this.$disable = this.selectbtn;

    this.updateDisplay();
  }

  updateDisplay() {
    this.$image.src = this.getValue();
    return this;
  }

  label(label) {
    this.selectbtn.textContent = label;
    return this;
  }
}
