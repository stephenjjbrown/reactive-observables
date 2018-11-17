import { Observable } from "rxjs";
export declare class TrackedSubject<T> {
    private subject;
    distinctObservable: Observable<T>;
    value: T;
    private updateForced;
    forceUpdate(): void;
    constructor(initialValue: T);
    subscribe(observer: (value: T) => void): import("rxjs/internal/Subscription").Subscription;
}
//# sourceMappingURL=tracked-subject.d.ts.map