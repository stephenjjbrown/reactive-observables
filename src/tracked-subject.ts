import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, skip } from "rxjs/operators";
import { trackableManager } from "./trackable-manager";

export class TrackedSubject<T> {
    private subject: BehaviorSubject<T>;
    
    observable: Observable<T>;

    get value() {
        trackableManager.trackableAccessed(this);
        return this.subject.value;
    }

    set value(value) {
        this.subject.next(value);
    }

    constructor(initialValue: T, compare?: (a: T, b: T) => boolean) {
        this.subject = new BehaviorSubject(initialValue);

        this.observable = this.subject
            .pipe(distinctUntilChanged(compare))
            .pipe(skip(1))
    }

    subscribe(observer: (value: T) => void) {
        return this.observable
            .subscribe(observer);
    }
}