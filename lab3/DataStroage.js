import { DataUnit } from "./DataUnit.js";

export class DataStroage {
    constructor() {
        this.storage = [];
    }

    registerId(id) {
        this.storage.push(new DataUnit(id));
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
