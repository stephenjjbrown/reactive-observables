import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, skip } from "rxjs/operators";
import { trackableManager } from "./trackable-manager";

export class TrackedSubject<T> {
    private subject: BehaviorSubject<T>;
    
    distinctObservable: Observable<T>;

    get value() {
        trackableManager.trackableAccessed(this);
        return this.subject.value;
    }

    set value(value) {
        this.subject.next(value);
    }

    private updateForced = false;

    forceUpdate() {
        this.updateForced = true;
        this.subject.next(this.subject.value);
    }

    constructor(initialValue: T) {
        this.subject = new BehaviorSubject(initialValue);

        this.distinctObservable = this.subject
            .pipe(distinctUntilChanged((a, b) => {
                if (this.updateForced) {
                    this.updateForced = false;
                    return false;
                }
                return a === b;
            }))
            .pipe(skip(1))
    }

    subscribe(observer: (value: T) => void) {
        return this.distinctObservable
            .subscribe(observer);
    }
}