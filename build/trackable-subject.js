"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var trackable_manager_1 = require("./trackable-manager");
var TrackableSubject = /** @class */ (function () {
    function TrackableSubject(initialValue) {
        this.subject = new rxjs_1.BehaviorSubject(initialValue);
    }
    Object.defineProperty(TrackableSubject.prototype, "value", {
        get: function () {
            trackable_manager_1.trackableManager.trackableAccessed(this);
            return this.subject.value;
        },
        set: function (value) {
            this.subject.next(value);
        },
        enumerable: true,
        configurable: true
    });
    TrackableSubject.prototype.subscribe = function (observer) {
        return this.subject
            .pipe(operators_1.distinctUntilChanged())
            .pipe(operators_1.skip(1))
            .subscribe(observer);
    };
    return TrackableSubject;
}());
exports.TrackableSubject = TrackableSubject;
