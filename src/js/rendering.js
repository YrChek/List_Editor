export default class Rendering {
  constructor(classParentElement) {
    this.parentElement = document.querySelector(`.${classParentElement}`);
    this.dataRendering = this.dataRendering.bind(this);
    this.deletingNotes = this.deletingNotes.bind(this);
  }

  dataRendering(databaseList) {
    databaseList.forEach((element) => {
      const { id } = element;
      const { name } = element;
      const { price } = element;
      const html = Rendering.noteTemplate(id, name, price);
      this.parentElement.insertAdjacentHTML('beforeend', html);
    });
  }

  static noteTemplate(id, name, price) {
    return `
      <div id="${id}"class="note">
        <div class="name">${name}</div>
        <div class="price">${price}</div>
        <div class="actions">
          <div class="note-icon-edit"></div>
          <div class="note-icon-del"></div>
        </div>
      </div>
    `;
  }

  deletingNotes() {
    const listNotes = this.parentElement.querySelectorAll('.note');
    listNotes.forEach((el) => el.remove());
  }
}
