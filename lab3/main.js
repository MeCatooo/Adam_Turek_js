recording = {
    isOn: false,
    channel: []
};
let data = [];
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
    if (recording.isOn) {
        var recorded = { soundName: sound, timestamp: Date.now() }
        data.push(recorded)
    }
    playSound(sound)

}

function playSound(sound) {
    const audioTag = document.querySelector(`#${sound}`).querySelector("audio");
    audioTag.currentTime = 0;
    audioTag.play();
}

function removeChannel(number) {
    const index = recording.channel.indexOf(number);
    if (index > -1) {
        recording.channel.splice(index, 1);
    }
}

function removeInterval(id) {
    const index = intervals.findIndex(item => item.id === id)
    if (index > -1) {
        intervals.splice(index, 1);
    }
}

document.querySelectorAll("#start").addEventListener("click", (event) => {
    if (event.target.checked) {
        data = [];
        recording.isOn = true;
        recording.channel.push(event.target.parentElement.id);
    }
    else {
        recording.isOn = false;
        removeChannel(event.target.parentElement.id)
    }
})

document.querySelectorAll("#play").forEach(item =>{
    item.addEventListener("click", () => {
        for (let i = 0; i < data.length; i++) {
            setTimeout(() => {
                playSound(data[i].soundName)
            }, data[i].timestamp - data[0].timestamp)
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
        if(event.target.value <= 0)
            return;
        const interval = setInterval(() => {
            recordingLayer(id)
        }, 1/(event.target.value / 60) * 200)
        const toSave = { interval: interval, id: id }
        intervals.push(toSave)
    })
});

