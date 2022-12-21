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
    isMatch(query) {
        if(!query)
            return true;
        return (this.title.value.includes(query) || this.input.value.includes(query));
    }

}

export class Weather{
    constructor(city, weatherData = undefined){
        this.city = city;
        this.weatherData = weatherData;
        this.Weather = document.createElement("div");
        this.Weather.classList.add("Note");
        this.createDisplay();
        if(!this.weatherData)
            this.fetchWeather();
        else
            this.updateWeather();
        this.updater();
    }
    fetchWeather(){
        const apiKey = "7b19818bf7f7fe6ea4116702e233011f";
        const metric = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},pl&appid=${apiKey}&units=${metric}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.weatherData = data;
            this.updateWeather();
        });
    }
    updateWeather(){
        this.cityName.textContent = this.city;
        this.temp.textContent = this.weatherData.main.temp + " °C";
        this.description.textContent = this.weatherData.weather[0].description;
        this.wind.textContent = this.weatherData.wind.speed + " m/s";
        this.icon.src = `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`;
    }
    updater(){
        this.fetchWeather();
        setTimeout(this.updater, 60000);
    }
    createDisplay(){

        this.cityName = document.createElement("span");
        this.cityName.textContent = this.cityName;
        this.Weather.appendChild(this.cityName);

        this.temp = document.createElement("span");
        this.temp.textContent = "temp";
        this.Weather.appendChild(this.temp);

        this.description = document.createElement("span");
        this.description.textContent = "description";
        this.Weather.appendChild(this.description);

        this.wind = document.createElement("span");
        this.wind.textContent = "wind";
        this.Weather.appendChild(this.wind);

        this.icon = document.createElement("img");
        this.icon.src = "icon";
        this.icon.style.width = "50px";
        this.Weather.appendChild(this.icon);
    }
    jSON(){
        return {
            city: this.city,
            weatherData: this.weatherData
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
        localStorage.setItem("weather", JSON.stringify(this.notes.map(note => note.jSON())));
        localStorage.setItem("pinnedWeather", JSON.stringify(this.pinnedNotes.map(note => note.jSON())));
    }
    
    loadFromStorage() {
        const notess = JSON.parse(localStorage.getItem("weather")) ?? [];
        const pinnedNotess = JSON.parse(localStorage.getItem("pinnedWeather")) ?? [];
        notess.forEach(note => {
            this.notes.push(new Weather(note.city, note.weatherData));
        });
        addEventListener("change", this.saveToStorage.bind(this));
    }
    findAll(query) {
        return {notes:this.notes.filter(note => note.isMatch(query)), 
            pinnedNotes:this.pinnedNotes.filter(note => note.isMatch(query))};
    }
}