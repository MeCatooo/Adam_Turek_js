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
