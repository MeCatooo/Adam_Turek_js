export class Note {
    constructor(date, color, text) {
        this.note = document.createElement("div");
        this.note.classList.add("Note");
        this.createUtility(date, color);
        this.createInput(text);
        this.createButtons();

    }

    //create input
    createInput(text) {
        this.input = document.createElement("textarea");
        this.input.placeholder = "Enter a note";
        this.input.classList.add("noteInput");
        this.input.toggleAttribute("disabled");
        this.input.value = text ?? "";

        this.note.appendChild(this.input);
    }

    //create utilitry
    createUtility(date, color) {
        const utility = document.createElement("div");
        utility.classList.add("utility");
        const pin = document.createElement("img");
        pin.src = "../utility/pin-icon.webp";
        pin.addEventListener("click", this.pin.bind(this));
        utility.appendChild(pin);
        this.createDate = date ?? Date.now();
        utility.appendChild(document.createElement("span")).textContent = new Date().toISOString().split('T')[0];
        this.color = document.createElement("input");
        this.color.type = "color";
        this.color.addEventListener("change", this.setColor.bind(this));
        if(color){
            this.color.value = color;
            setColor(color);
        }
        utility.appendChild(this.color);

        this.note.appendChild(utility);
    }

    //create buttons
    createButtons() {
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", this.edit.bind(this));
        buttons.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", this.remove.bind(this));
        buttons.appendChild(deleteButton);
        const remindButton = document.createElement("button");
        remindButton.innerHTML = "Remind";
        remindButton.addEventListener("click", this.remind.bind(this));
        buttons.appendChild(remindButton);

        this.note.appendChild(buttons);
    }
    edit() {
        this.input.toggleAttribute("disabled");
    }
    //remove note from document
    remove() {
        this.note.remove();
    }
    //remider
    remind() {
        new Notification(1000, this);
    }
    //set color
    setColor() {
        this.note.style.backgroundColor = this.color.value;
    }
    //pin note
    pin() {
        console.log("library");
    }
    jSON() {
        return {
            text: this.input.value,
            date: this.createDate,
            color: this.color.value
        }
    }

}

export class Storage {
    constructor() {
        this.notes = [];
        this.pinnedNotes = [];
        this.loadFromStorage();
    }
    //add note to notes array
    add(note) {
        this.notes.push(note);
        this.saveToStorage()
    }
    //add note to pinnedNotes array
    pin(note) {
        this.pinnedNotes.push(note);
        this.remove(note);
    }
    //remove note from notes array
    remove(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.saveToStorage()
    }
    //remove note from pinnedNotes array
    unpin(note) {
        const indexOfNote = this.pinnedNotes.indexOf(note);
        this.pinnedNotes.splice(indexOfNote, 1);
        this.add(note);
    }
    saveToStorage() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
        localStorage.setItem("pinnedNotes", JSON.stringify(this.pinnedNotes));
    }
    loadFromStorage() {
        this.notes = JSON.parse(localStorage.getItem("notes")) ?? [];
        this.pinnedNotes = JSON.parse(localStorage.getItem("pinnedNotes")) ?? [];
    }

}

export class Notification {
    constructor(time, note) {
        this.note = note;
        this.notification = document.createElement("div");
        this.notification.classList.add("notification");
        this.notification.innerHTML = "Notification";
        this.notification.addEventListener("click", this.triger.bind(this));
        setTimeout(this.triger.bind(this), time);
    }
    triger() {
        alert("Your remider for note: " + this.note.input.value);
    }
}