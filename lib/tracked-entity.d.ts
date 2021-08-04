import { TrackedSubject } from "./tracked-subject";
import { Subscription, Observable } from "rxjs";
export declare class TrackedEntity<T> {
    subject: TrackedSubject<T>;
    subscription: Subscription | null;
    observable: Observable<undefined>;
    next: () => void;
    get value(): T;
    set value(value: T);
    constructor(initialValue: T);
    subscribe(observer: () => void): Subscription;
}
