import { Trackable } from "./trackable";

class TrackableManager {
    // Used for checking for circular dependencies. Make sure originator of listening isn't in its own list of dependencies
    private listenerStack: Trackable<any>[] = [];

    private listenStack: Trackable<any>[][] = [];
    private get isListening() {
        return this.listenStack.length > 0;
    }

    trackableAccessed(subscribable: Trackable<any>) {
        if (this.listenStack.some(arr => arr.some(s => s === subscribable))) {
            console.error("Trackable is its own dependency: ", subscribable);
            throw new Error("Circular dependency detected");
        }

        if (this.isListening) {
            const top = this.listenStack[this.listenStack.length - 1];
            if (top.indexOf(subscribable) === -1)
                top.push(subscribable);
        }
    }

    startListening(listener: Trackable<any>) {
        this.listenerStack.push(listener);
        this.listenStack.push([]);
    }

    stopListening() {
        this.listenerStack.pop();
        const dependencies = this.listenStack.pop();
        if (dependencies == null)
            throw new Error("Listening stack malformed, could not pop dependencies from stack");
        return dependencies;
    }
}

export const trackableManager = new TrackableManager();
