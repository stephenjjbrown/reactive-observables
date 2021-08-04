import { Observable } from "rxjs";
export declare class TrackedSubject<T> {
    private subject;
    observable: Observable<T>;
    get value(): T;
    set value(value: T);
    constructor(initialValue: T, compare?: (a: T, b: T) => boolean);
    subscribe(observer: (value: T) => void): import("rxjs").Subscription;
}
