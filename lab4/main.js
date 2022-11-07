import { Note, Storage } from './library.js';


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

document.querySelector("#add").addEventListener("click", function () {
  const newNote = new Note();
  storage.add(newNote);
  document.querySelector("#Notes").appendChild(newNote.note);
});

document.querySelector("#notifications").addEventListener("click", function (event) {
  const content = document.querySelector(".content")
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = "20vw";
  }
});

function renderNote(note){
  document.querySelector("#Notes").appendChild(note.note);
}
function renderPinned(note){
  document.querySelector("#Pinned").appendChild(note.note);
}