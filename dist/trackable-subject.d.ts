export declare class TrackableSubject<T> {
    private subject;
    value: T;
    constructor(initialValue: T);
    subscribe(observer: (value: T) => void): import("rxjs/internal/Subscription").Subscription;
}
//# sourceMappingURL=trackable-subject.d.ts.map