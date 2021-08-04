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
export declare const getAllObservables: <T>(obj: T) => (import("rxjs").Observable<undefined> | import("rxjs").Observable<unknown[]> | import("rxjs").Observable<T[string]> | import("rxjs").Observable<T[number]> | import("rxjs").Observable<T[symbol]> | import("rxjs").Observable<T[keyof T]>)[];
export declare const subscribeAll: <T>(obj: T, observer: (values: any) => void) => Subscription;
export {};
