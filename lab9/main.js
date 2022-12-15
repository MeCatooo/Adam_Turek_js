import { Note, Storage, Weather } from './library.js';


Note.prototype.pin = function () {
  this.note.classList.toggle("pinned");
  if (this.note.classList.contains("pinned")) {
    storage.pin(this);
    renderPinned(this);
  } else {
    storage.unpin(this);
    renderNote(this);
  }
}

Note.prototype.remove = function () {
  storage.remove(this);
  this.note.remove();
}

let storage = new Storage();

addEventListener("load", () => {
  storage.notes.forEach(note => {
    renderNote(note);
  });
  storage.pinnedNotes.forEach(note => {
    renderPinned(note);
  });
});

document.querySelector("#add").addEventListener("click", function (event) {
  const search = document.querySelector("#Search").value;
  storage.add(new Weather(search));
  renderNote(storage.notes[storage.notes.length - 1]);


});

function renderNote(note) {
  document.querySelector("#Notes").appendChild(note.Weather);
}
function renderPinned(note) {
  document.querySelector("#Pinned").appendChild(note.Weather);
}