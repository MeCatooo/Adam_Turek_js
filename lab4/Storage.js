import { Note } from "./Note.js";


export class Storage {
    constructor() {
        this.notes = [];
        this.pinnedNotes = [];
        this.loadFromStorage();
    }
    //add note to notes array
    add(note) {
        this.notes.push(note);
        this.saveToStorage();
    }
    //add note to pinnedNotes array
    pin(note) {
        this.pinnedNotes.push(note);
        this.remove(note);
    }
    //remove note from notes array
    remove(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.saveToStorage();
    }
    //remove note from pinnedNotes array
    unpin(note) {
        const indexOfNote = this.pinnedNotes.indexOf(note);
        this.pinnedNotes.splice(indexOfNote, 1);
        this.add(note);
    }

    saveToStorage() {
        localStorage.setItem("notes", JSON.stringify(this.notes.map(note => note.jSON())));
        localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes.map(note => note.jSON())));
    }

    loadFromStorage() {
        const notess = JSON.parse(localStorage.getItem("notes")) ?? [];
        const pinnedNotess = JSON.parse(localStorage.getItem("pinnedNotes")) ?? [];
        notess.forEach(note => {
            this.notes.push(new Note(
                note.date,
                note.color,
                note.text,
                note.title
            ));
        });
        pinnedNotess.forEach(note => {
            this.pinnedNotes.push(new Note(
                note.date,
                note.color,
                note.text,
                note.title
            ));
        });
        addEventListener("change", this.saveToStorage.bind(this));
    }
    findAll(query) {
        return {
            notes: this.notes.filter(note => note.isMatch(query)),
            pinnedNotes: this.pinnedNotes.filter(note => note.isMatch(query))
        };
    }
}
