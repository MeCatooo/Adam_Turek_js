export class DataUnit {
    constructor(id) {
        this.id = id;
        this.isRecording = false;
        this.data = [];
    }

    pushData(sound) {
        this.data.push({ soundName: sound, timestamp: Date.now() });
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
    
    getData() {
        return this.data;
    }
}
