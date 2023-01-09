import { Note } from "./note.js";
import { Storage } from "./Storage.js";

let storage = new Storage();

addEventListener("load", () => {
  const notes = storage.getRenderedNotes();
  notes.notes.forEach(note => {
    renderNote(note);
  });
  notes.pinnedNotes.forEach(note => {
    renderPinned(note);
  });
});

addEventListener("pinNote", (event) => {
  const note = event.detail;
  if (storage.pinnedNotes.includes(note)) {
    renderPinned(note);
  } else {
    renderNote(note);
  }
});

document.querySelector("#add").addEventListener("click", function () {
  const newNote = new Note();
  storage.add(newNote);
  renderNote(newNote);
});

document.querySelector("#notifications").addEventListener("click", function (event) {
  const content = document.querySelector(".content")
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = "20vw";
  }
});

document.querySelector("#Search").addEventListener("keyup", function (event) {
  const search = event.target.value.toLowerCase();
  const finded = storage.findAll(search);
  document.querySelector("#Notes").innerHTML = "";
  document.querySelector("#Pinned").innerHTML = "";
  finded.notes.forEach(note => {
    renderNote(note);
  });
  finded.pinnedNotes.forEach(note => {
    renderPinned(note);
  });

});

function renderNote(note) {
  document.querySelector("#Notes").appendChild(note.note);
}
function renderPinned(note) {
  document.querySelector("#Pinned").appendChild(note.note);
}