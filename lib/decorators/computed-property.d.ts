import { TrackedComputedSubject } from "../tracked-computed-subject";
interface ComputedProperty<T> {
    subject: TrackedComputedSubject<T>;
}
declare type ComputedPropertyList<T> = {
    [K in keyof T]: ComputedProperty<T[K]>;
};
export declare const getComputedPropertyList: <T>(obj: T) => ComputedPropertyList<T>;
export declare const getOrSetupComputedProperty: <T, K extends keyof T>(obj: T, name: K, getter: () => T[K]) => TrackedComputedSubject<T[K]>;
export declare const getComputedProperty: <T, K extends keyof T>(obj: T, name: K) => TrackedComputedSubject<T[K]>;
export {};
