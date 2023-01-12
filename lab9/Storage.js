import { Weather } from "./Weather.js";


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

    pin(note) {
        this.pinnedNotes.push(note);
        this.remove(note);
    }

    remove(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.saveToStorage();
    }

    unpin(note) {
        const indexOfNote = this.pinnedNotes.indexOf(note);
        this.pinnedNotes.splice(indexOfNote, 1);
        this.add(note);
    }

    saveToStorage() {
        localStorage.setItem("weather", JSON.stringify(this.notes.map(note => note.jSON())));
        localStorage.setItem("pinnedWeather", JSON.stringify(this.pinnedNotes.map(note => note.jSON())));
    }

    loadFromStorage() {
        const notess = JSON.parse(localStorage.getItem("weather")) ?? [];
        notess.forEach(note => {
            this.notes.push(new Weather(note.city, note.weatherData));
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
