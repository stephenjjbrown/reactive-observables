import { TrackedSubject } from "./tracked-subject";
export declare class TrackedArray<T> {
    subject: TrackedSubject<T[]>;
    value: T[];
    constructor(initialValue: T[], compare?: (a: T[], b: T[]) => boolean);
    readonly observable: import("rxjs/internal/Observable").Observable<T[]>;
    subscribe(observer: (value: T[]) => void): import("rxjs/internal/Subscription").Subscription;
}
//# sourceMappingURL=tracked-array.d.ts.map