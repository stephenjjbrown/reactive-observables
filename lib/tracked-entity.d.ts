import { TrackedSubject } from "./tracked-subject";
import { Subscription, Observable } from "rxjs";
export declare class TrackedEntity<T> {
    subject: TrackedSubject<T>;
    subscription: Subscription | null;
    observable: Observable<undefined>;
    next: () => void;
    value: T;
    constructor(initialValue: T);
    subscribe(observer: () => void): Subscription;
}
//# sourceMappingURL=tracked-entity.d.ts.map