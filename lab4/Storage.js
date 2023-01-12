import { Note } from "./Note.js";


export class Storage {
    constructor() {
        this.notes = [];
        this.pinnedNotes = [];
        this.loadFromStorage();
    }

    add(note) {
        this.notes.push(note);
        this.saveToStorage();
    }

    #pin(note) {
        this.pinnedNotes.push(note);
        this.notes.splice(this.notes.indexOf(note), 1);
        this.saveToStorage();
    }

    remove(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.pinnedNotes.splice(this.pinnedNotes.indexOf(note), 1);
        this.saveToStorage();
    }

    #unpin(note) {
        const indexOfNote = this.pinnedNotes.indexOf(note);
        this.pinnedNotes.splice(indexOfNote, 1);
        this.add(note);
    }

    togglePin(note) {;
        if (this.pinnedNotes.includes(note)) {
            this.#unpin(note);
        } else {
            this.#pin(note);
        }
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

    getRenderedNotes() {
        return{
            notes: this.notes,
            pinnedNotes: this.pinnedNotes
        }
    }
}
