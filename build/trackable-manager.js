"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TrackableManager = /** @class */ (function () {
    function TrackableManager() {
        this.listenStack = [];
    }
    Object.defineProperty(TrackableManager.prototype, "isListening", {
        get: function () {
            return this.listenStack.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    TrackableManager.prototype.trackableAccessed = function (subscribable) {
        if (this.isListening) {
            var top = this.listenStack[this.listenStack.length - 1];
            if (top.indexOf(subscribable) === -1)
                top.push(subscribable);
        }
    };
    TrackableManager.prototype.startListening = function () {
        this.listenStack.push([]);
    };
    TrackableManager.prototype.stopListening = function () {
        return this.listenStack.pop();
    };
    return TrackableManager;
}());
exports.trackableManager = new TrackableManager();
