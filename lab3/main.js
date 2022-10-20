recording = {
    isOn: false,
    channel: 1
};
let data = [];

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
    const audioTag = document.querySelector(`#${sound}`);
    audioTag.currentTime = 0;
    audioTag.play();
}

document.querySelector("#start").addEventListener("click", () => {
    if (!document.querySelector("#start").checked)
        data = [];
    else {
        recording = {
            isOn: true,
            channel: 1
        };
    }
})
document.querySelector("#play").addEventListener("click", () => {
    for(let i = 0; i < data.length; i++) {
        setTimeout(() => {
            playSound(data[i].soundName)
        }, data[i].timestamp - data[0].timestamp)
    }

})