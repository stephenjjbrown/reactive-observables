import { TrackedSubject } from "./tracked-subject";
export declare class TrackedArray<T> {
    subject: TrackedSubject<T[]>;
    get value(): T[];
    set value(value: T[]);
    constructor(initialValue: T[], compare?: (a: T[], b: T[]) => boolean);
    get observable(): import("rxjs").Observable<T[]>;
    subscribe(observer: (value: T[]) => void): import("rxjs").Subscription;
}
