export class Note {
    constructor(date, color, text, title) {
        this.note = document.createElement("div");
        this.note.classList.add("Note");
        this.createUtility(date, color);
        this.createInput(text, title);
        this.createButtons();

    }

    //create input
    createInput(text, title) {
        this.title = document.createElement("input");
        this.title.type = "text";
        this.title.classList.add("title");
        this.title.placeholder = "Title";
        this.title.disabled = true;
        this.title.value = title ?? "";
        this.note.appendChild(this.title);

        this.input = document.createElement("textarea");
        this.input.placeholder = "Enter a note";
        this.input.classList.add("noteInput");
        this.input.toggleAttribute("disabled");
        this.input.value = text ?? "";

        this.note.appendChild(this.input);
    }

    //create utility
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
        this.color.value = color ?? "#f2f2f2";
        this.color.addEventListener("change", this.setColor.bind(this));
        if (color) {
            this.color.value = color ?? "#ffffff";
            this.setColor(color ?? "#ffffff");
        }
        utility.appendChild(this.color);

        this.note.appendChild(utility);
    }

    //create buttons
    createButtons() {
        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        this.editButton = document.createElement("button");
        this.editButton.innerHTML = "Edit";
        this.editButton.addEventListener("click", this.edit.bind(this));
        buttons.appendChild(this.editButton);

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
        this.title.toggleAttribute("disabled");
        if (!this.editButton.classList.contains("edit")) {
            this.editButton.classList.add("edit");
            this.editButton.innerHTML = "Save";
        } else {
            this.editButton.innerHTML = "Edit";
            this.editButton.classList.remove("edit");
        }
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
            title: this.title.value,
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