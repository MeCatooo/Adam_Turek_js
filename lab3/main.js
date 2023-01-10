import {DataStroage} from './library.js'

let data = new DataStroage();
let intervalsMetronom = [];
let intervalsRecords = [];

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

function playRecord(event) {
    const storage = data.getData(event.target.parentElement.id);
    for (const element of storage) {
        setTimeout(() => {
            playSound(element.soundName)
        }, element.timestamp - storage[0].timestamp)
    }
}

function removeInterval(id) {
    const index = intervalsMetronom.findIndex(item => item.id === id)
    if (index > -1) {
        intervalsMetronom.splice(index, 1);
    }
}
function removeIntervalRecorded(id) {
    const index = intervalsRecords.findIndex(item => item.id === id)
    if (index > -1) {
        intervalsRecords.splice(index, 1);
    }
}

function disableButtons(element) {
    element.querySelectorAll("button").forEach(item => item.disabled = true);
}

function enableButtons(element) {
    element.querySelectorAll("button").forEach(item => item.disabled = false);
}

document.querySelectorAll("#start").forEach(item => {
    item.addEventListener("click", (event) => {
        data.activeChannel(event.target.parentElement.id)
        disableButtons(event.target.parentElement);
        const progress = event.target.parentElement.querySelector("progress");
        progress.value = 0;
        const interval = setInterval(() => {
            progress.value += 0.5;
        }, 500)
        setTimeout(() => {
            data.deactiveChannel(event.target.parentElement.id);
            clearInterval(interval);
            enableButtons(event.target.parentElement);
        }, 1000 * 10)
    })
})

document.querySelectorAll("#clear").forEach(item => {
    item.addEventListener("click", (event) => {
        event.target.parentElement.querySelector("progress").value = 0;
        data.clearData(event.target.parentElement.id);
    })
})

document.querySelectorAll("#play").forEach(item => {
    item.addEventListener("click", (event) => {
        playRecord(event);
    })
})

document.querySelectorAll("#loop").forEach(item => {
    item.addEventListener("click", (event) => {
        const id = event.target.parentElement.id;
        const isRunning = intervalsRecords.find(item => item.id === id);
        if (isRunning) {
            clearInterval(isRunning.interval)
            removeIntervalRecorded(id);
        }
        if (!event.target.checked)
            return;
        const interval = setInterval(() => {
            playRecord(event);
        }, 1000 * 10);
        const toSave = { interval: interval, id: id }
        intervalsRecords.push(toSave);
    })
})
document.querySelectorAll(".audio-style input").forEach(element => {
    element.addEventListener("change", (event) => {
        const id = event.target.parentElement.id;
        const isRunning = intervalsMetronom.find(item => item.id === id);
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
        intervalsMetronom.push(toSave)
    })
});

window.addEventListener("load", (event) => {
    const tmp = document.querySelectorAll("#start");
    tmp.forEach(item => data.registerId(item.parentElement.id));
});

