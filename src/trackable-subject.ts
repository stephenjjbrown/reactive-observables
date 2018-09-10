import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, skip } from "rxjs/operators";
import { trackableManager } from "./trackable-manager";

export class TrackableSubject<T> {
    private subject: BehaviorSubject<T>;

    get value() {
        trackableManager.trackableAccessed(this);
        return this.subject.value;
    }

    set value(value) {
        this.subject.next(value);
    }

    constructor(initialValue: T) {
        this.subject = new BehaviorSubject(initialValue);
    }

    subscribe(observer: (value: T) => void) {
        return this.subject
            .pipe(distinctUntilChanged())
            .pipe(skip(1))
            .subscribe(observer);
    }
}