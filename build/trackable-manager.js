class TrackableManager {
    constructor() {
        this.listenStack = [];
    }
    get isListening() {
        return this.listenStack.length > 0;
    }
    trackableAccessed(subscribable) {
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
        const dependencies = this.listenStack.pop();
        if (dependencies == null)
            throw new Error("Listening stack malformed, could not pop dependencies from stack");
        return dependencies;
    }
}
export const trackableManager = new TrackableManager();
