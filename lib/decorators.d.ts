import { TrackedTypeForValue } from "./trackable";
import { Subscription, Observable } from "rxjs";
export declare const getTracked: <T, K extends keyof T>(obj: T, name: K) => TrackedTypeForValue<T[K]>;
export declare const getAllTrackedProperties: <T>(obj: T) => TrackedTypeForValue<T[keyof T]>[];
export declare const getAllObservables: <T>(obj: T) => (Observable<{}[]> | Observable<T[keyof T]>)[];
export declare const subscribeAll: <T>(obj: T, observer: (values: any) => void) => Subscription;
/**
 * Wraps property in getters and setters for a TrackedSubject or TrackedArray;
 */
export declare function tracked<T>(initialValue: T): (prototype: any, propertyName: string) => any;
export declare function trackable(constructor: any): void;
export declare const isTrackableEntity: (obj: any) => boolean;
//# sourceMappingURL=decorators.d.ts.map