import { TrackedSubject } from "./tracked-subject";
import { distinctUntilChanged, skip } from "rxjs/operators";
import { isTrackableEntity, subscribeAll } from "./decorators";
import { Subscription, Observable, Observer, merge } from "rxjs";

// Tracks an object. If the object itself is changed emit event, or if any of the objects children changes, emit event


export class TrackedEntity<T> {
    subject: TrackedSubject<T>;

    subscription: Subscription | null = null;
    observable: Observable<undefined>;
    next: () => void;

    get value() {
        return this.subject.value;
    }

    set value(value) {

        if (value !== this.subject.value) {
            // If new value, then tear down old subscription
            if (this.subscription && !this.subscription.closed) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
        }

        if (isTrackableEntity(value)) {
            // Setup subscription
            this.subscription = subscribeAll(value, this.next);
        }

        this.subject.value = value;
    }

    constructor(initialValue: T) {
        this.subject = new TrackedSubject(initialValue);

        this.observable = new Observable((subscriber) => {
            this.next = () => subscriber.next();
        })

        if (isTrackableEntity(initialValue)) {

            // Setup subscription
            this.subscription = subscribeAll(initialValue, () => this.next());
        }
    }

    subscribe(observer: () => void) {
        return merge(this.observable, this.subject.distinctObservable)
            .subscribe(observer);
    }
}


// export class TrackedSubjectq<T> {
//     private subject: BehaviorSubject<T>;

//     get value() {
//         trackableManager.trackableAccessed(this);
//         return this.subject.value;
//     }

//     set value(value) {
//         this.subject.next(value);
//     }

//     constructor(initialValue: T) {
//         this.subject = new BehaviorSubject(initialValue);
//     }

//     subscribe(observer: (value: T) => void) {
//         return this.subject
//             .pipe(distinctUntilChanged())
//             .pipe(skip(1))
//             .subscribe(observer);
//     }
// }