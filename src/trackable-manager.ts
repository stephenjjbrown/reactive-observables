import { Trackable } from "./trackable";

class TrackableManager {
    private listenStack: Trackable<any>[][] = [];
    private get isListening() {
        return this.listenStack.length > 0;
    }

    trackableAccessed(subscribable: Trackable<any>) {
        if (this.isListening) {
            const top = this.listenStack[this.listenStack.length - 1];
            if (top.indexOf(subscribable) === -1)
                top.push(subscribable);
        }
    }

    startListening() {
        this.listenStack.push([]);
    }

    stopListening() {
        return this.listenStack.pop();
    }
}

export const trackableManager = new TrackableManager();
