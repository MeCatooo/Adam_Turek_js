import { Notification } from "./Notification.js";

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
        const event = new CustomEvent("removeNote", {detail:this});
        window.dispatchEvent(event);
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
        const event = new CustomEvent("pinNote", {detail:this});
        window.dispatchEvent(event);
    }

    jSON() {
        return {
            title: this.title.value,
            text: this.input.value,
            date: this.createDate,
            color: this.color.value
        };
    }
    isMatch(query) {
        if (!query)
            return true;
        return (this.title.value.includes(query) || this.input.value.includes(query));
    }

}
