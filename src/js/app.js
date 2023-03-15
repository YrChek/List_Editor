import DB from './db';
import Rendering from './rendering';
import Popup from './popup';

document.addEventListener('DOMContentLoaded', () => {
  const create = document.querySelector('.titleBoxing-icon');
  const container = document.querySelector('.containerNotes');
  const dbId = Number(localStorage.getItem(0));
  const rendering = new Rendering('containerNotes');
  const popup = new Popup('sharedContainer');
  if (dbId) DB.id = dbId;
  let databaseList = DB.allDBentries();
  rendering.dataRendering(databaseList);
  create.addEventListener('click', () => {
    popup.formsWidget();
    popup.eventsPopup();
  });
  container.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('note-icon-edit')) {
      const note = el.closest('.note');
      const id = Number(note.id);
      const name = note.querySelector('.name').textContent;
      const price = Number(note.querySelector('.price').textContent);
      popup.formsWidget();
      const parentPopup = document.querySelector('.popup');
      parentPopup.setAttribute('data-id', id);
      const formNamePopup = parentPopup.querySelector('.form-name');
      const formPricePopup = parentPopup.querySelector('.form-price');
      formNamePopup.value = name;
      formPricePopup.value = price;
      popup.eventsPopup();
    }
    if (el.classList.contains('note-icon-del')) {
      const note = el.closest('.note');
      const key = note.id;
      const name = note.querySelector('.name');
      const price = note.querySelector('.price');
      price.classList.add('del');
      name.textContent = '';
      price.textContent = 'Запись удалена';
      DB.delDbNote(key);
      databaseList = DB.allDBentries();
      setTimeout(() => {
        rendering.deletingNotes();
        rendering.dataRendering(databaseList);
      }, 500);
    }
  });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem(0, DB.id);
});
