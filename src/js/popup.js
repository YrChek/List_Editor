import DB from './db';
import Rendering from './rendering';
import validator from './validator';

export default class Popup {
  constructor(classParentElement) {
    this.parentElement = document.querySelector(`.${classParentElement}`);
    this.formsWidget = this.formsWidget.bind(this);
    this.delFormsWidget = this.delFormsWidget.bind(this);
    this.eventsPopup = this.eventsPopup.bind(this);
  }

  static popupTemplate() {
    return `
      <div class="popup" data-id="new">
        <div class="popup-forms">
          <form>
            <div class="form-row">
              <span class="hint">Название</span>
              <input type="text" class="form form-name">
              <div class="error"></div>
            </div>
            <div class="form-row">
              <span class="hint">Стоимость</span>
              <input type="text" class="form form-price">
              <div class="error"></div>
            </div>
            <div class="buttons">
              <button class="btn save">Сохранить</button>
              <button type="reset" class="btn reset">Отмена</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  formsWidget() {
    const html = Popup.popupTemplate();
    this.parentElement.insertAdjacentHTML('afterbegin', html);
  }

  delFormsWidget() {
    const popup = this.parentElement.querySelector('.popup');
    popup.remove();
  }

  buttonsPopup() {
    const parent = this.parentElement.querySelector('.popup');
    const btnSave = parent.querySelector('.save');
    const btnReset = parent.querySelector('.reset');
    return { btnSave, btnReset };
  }

  formsPopup() {
    const parent = this.parentElement.querySelector('.popup');
    const id = parent.getAttribute('data-id');
    const formName = parent.querySelector('.form-name');
    const formPrice = parent.querySelector('.form-price');
    return { id, formName, formPrice };
  }

  eventsPopup() {
    const btn = this.buttonsPopup();
    const forms = this.formsPopup();
    btn.btnSave.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validator(forms.formName, forms.formPrice)) return false;
      const rendering = new Rendering('containerNotes');
      // const forms = this.formsPopup();
      if (forms.id === 'new') {
        DB.createEntry(forms.formName.value, parseFloat(forms.formPrice.value));
        this.delFormsWidget();
        const databaseList = DB.allDBentries();
        rendering.deletingNotes();
        rendering.dataRendering(databaseList);
      } else {
        DB.changingNote(Number(forms.id), forms.formName.value, parseFloat(forms.formPrice.value));
        this.delFormsWidget();
        const databaseList = DB.allDBentries();
        rendering.deletingNotes();
        rendering.dataRendering(databaseList);
      }
      return true;
    });
    btn.btnReset.addEventListener('click', this.delFormsWidget);
    forms.formName.addEventListener('input', () => {
      forms.formName.nextElementSibling.textContent = '';
    });
    forms.formPrice.addEventListener('input', () => {
      forms.formPrice.nextElementSibling.textContent = '';
    });
  }
}
