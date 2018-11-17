export declare class TrackableComputedSubject<T> {
    private getter;
    private subject;
    private evaluateValue;
    readonly value: T;
    private _dependencies;
    private updateSubscriptions;
    constructor(getter: () => T);
    subscribe(observer: (value: T) => void): import("rxjs/internal/Subscription").Subscription;
}
//# sourceMappingURL=trackable-computed-subject.d.ts.map