export declare class TrackedComputedSubject<T> {
    private getter;
    private subject;
    private evaluateValue;
    readonly value: T;
    private _dependencies;
    private updateSubscriptions;
    constructor(getter: () => T);
    subscribe(observer: (value: T) => void): import("rxjs/internal/Subscription").Subscription;
}
//# sourceMappingURL=tracked-computed-subject.d.ts.map