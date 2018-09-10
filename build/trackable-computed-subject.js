"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var trackable_manager_1 = require("./trackable-manager");
var TrackableComputedSubject = /** @class */ (function () {
    function TrackableComputedSubject(getter) {
        this._dependencies = [];
        this.getter = getter;
        this.subject = new rxjs_1.BehaviorSubject(this.evaluateValue());
    }
    TrackableComputedSubject.prototype.evaluateValue = function () {
        trackable_manager_1.trackableManager.trackableAccessed(this);
        trackable_manager_1.trackableManager.startListening();
        var val = this.getter();
        var dependencies = trackable_manager_1.trackableManager.stopListening();
        this.updateSubscriptions(dependencies);
        return val;
    };
    Object.defineProperty(TrackableComputedSubject.prototype, "value", {
        get: function () {
            trackable_manager_1.trackableManager.trackableAccessed(this);
            return this.subject.value;
        },
        enumerable: true,
        configurable: true
    });
    TrackableComputedSubject.prototype.updateSubscriptions = function (dependencies) {
        var _this = this;
        for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
            var subscribable = dependencies_1[_i];
            if (subscribable !== this && this._dependencies.indexOf(subscribable) === -1) {
                subscribable.subscribe(function () {
                    _this.subject.next(_this.evaluateValue());
                });
                this._dependencies.push(subscribable);
            }
        }
    };
    TrackableComputedSubject.prototype.subscribe = function (observer) {
        return this.subject
            .pipe(operators_1.distinctUntilChanged())
            .pipe(operators_1.skip(1))
            .subscribe(observer);
    };
    return TrackableComputedSubject;
}());
exports.TrackableComputedSubject = TrackableComputedSubject;
