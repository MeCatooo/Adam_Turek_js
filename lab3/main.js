class DataStroage {
    constructor() {
        this.storage = []
    }
    registerId(id) {
        this.storage.push(new DataUnit(id))
    }
    pushData(sound) {
        this.storage.filter(item => item.isRecording === true)
            .forEach(item=>item.pushData(sound));
    }
    clearData(id) {
        this.storage.find(item => item.id === id)?.clearData();
    }
    activeChannel(id) {
        this.clearData(id);
        this.storage.find(item => item.id === id)?.activeChannel();
    }
    deactiveChannel(id) {
        this.storage.find(item => item.id === id)?.deactiveChannel();
    }
    getData(id) {
        return this.storage.find(item => item.id === id)?.getData();
    }
}

class DataUnit {
    constructor(id) {
        this.id = id;
        this.isRecording = false;
        this.data = [];
    }
    pushData(sound) {
        this.data.push({ soundName: sound, timestamp: Date.now() })
    }
    clearData() {
        this.data = [];
    }
    activeChannel() {
        this.isRecording = true;
    }
    deactiveChannel() {
        this.isRecording = false;
    }
    getData(){
        return this.data;
    }
}

let data = new DataStroage();
let intervals = [];

document.addEventListener("keypress", onKeyPress)

function onKeyPress(event) {
    switch (event.key) {
        case "a":
            recordingLayer("boom");
            break;
        case "s":
            recordingLayer("clap");
            break;
        case "d":
            recordingLayer("hihat");
            break;
        case "f":
            recordingLayer("kick");
            break;
        case "g":
            recordingLayer("openhat");
            break;
        case "q":
            recordingLayer("ride");
            break;
        case "w":
            recordingLayer("snare");
            break;
        case "e":
            recordingLayer("tink");
            break;
        case "r":
            recordingLayer("tom");
            break;
        default:
            console.log("press")
    }
}

function recordingLayer(sound) {
    data.pushData(sound)
    playSound(sound)
}

function playSound(sound) {
    const audioTag = document.querySelector(`#${sound}`).querySelector("audio");
    audioTag.currentTime = 0;
    audioTag.play();
}

function removeInterval(id) {
    const index = intervals.findIndex(item => item.id === id)
    if (index > -1) {
        intervals.splice(index, 1);
    }
}

document.querySelectorAll("#start").forEach(item => {
    item.addEventListener("click", (event) => {
        if (event.target.checked) {
            data.activeChannel(event.target.parentElement.id)
        }
        else {
            data.deactiveChannel(event.target.parentElement.id)
        }
    })
})

document.querySelectorAll("#clear").forEach(item => {
    item.addEventListener("click", (event) => {
        data.clearData(event.target.parentElement.id);
    })
})

document.querySelectorAll("#play").forEach(item => {
    item.addEventListener("click", (event) => {
        const storage = data.getData(event.target.parentElement.id);
        for (let i = 0; i < storage.length; i++) {
            setTimeout(() => {
                playSound(storage[i].soundName)
            }, storage[i].timestamp - storage[0].timestamp)
        }
    })
})

document.querySelectorAll(".audio-style input").forEach(element => {
    element.addEventListener("change", (event) => {
        const id = event.target.parentElement.id;
        const isRunning = intervals.find(item => item.id === id);
        if (isRunning) {
            clearInterval(isRunning.interval)
            removeInterval(id);
        }
        if (event.target.value <= 0)
            return;
        const interval = setInterval(() => {
            recordingLayer(id)
        }, 1 / (event.target.value / 60) * 200)
        const toSave = { interval: interval, id: id }
        intervals.push(toSave)
    })
});

window.addEventListener("load", (event)=>{
   const tmp = document.querySelectorAll("#start");
   tmp.forEach(item=>data.registerId(item.parentElement.id));
})

