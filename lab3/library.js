export class DataStroage {
    constructor() {
        this.storage = []
    }
    registerId(id) {
        this.storage.push(new DataUnit(id))
    }
    pushData(sound) {
        this.storage.filter(item => item.isRecording === true)
            .forEach(item => item.pushData(sound));
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

export class DataUnit {
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
    getData() {
        return this.data;
    }
}