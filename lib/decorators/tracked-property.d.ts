import { TrackedTypeForValue } from "../trackable";
import { Subscription } from "rxjs";
interface TrackedProperty<T> {
    subject: TrackedTypeForValue<T>;
}
declare type TrackedPropertyList<T> = {
    [K in keyof T]: TrackedProperty<T[K]>;
};
export declare const getTrackedProperty: <T, K extends keyof T>(obj: T, name: K, notFound?: ((list: TrackedPropertyList<T>, name: K) => TrackedTypeForValue<T[K]>) | undefined) => TrackedTypeForValue<T[K]>;
export declare const getAllTrackedProperties: <T>(obj: T) => (import("../tracked-computed-subject").TrackedComputedSubject<T[keyof T]> | TrackedTypeForValue<T[keyof T]>)[];
export declare const getAllObservables: <T>(obj: T) => (import("rxjs/internal/Observable").Observable<undefined> | import("rxjs/internal/Observable").Observable<{}[]> | import("rxjs/internal/Observable").Observable<T[keyof T]>)[];
export declare const subscribeAll: <T>(obj: T, observer: (values: any) => void) => Subscription;
export {};
//# sourceMappingURL=tracked-property.d.ts.map