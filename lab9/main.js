import { Storage } from "./Storage.js";
import { Weather } from "./Weather.js";

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