import { TrackedComputedSubject } from "../tracked-computed-subject";
export declare const getOrSetupComputedProperty: <T, K extends keyof T>(obj: T, name: K, getter: () => T[K]) => TrackedComputedSubject<T[K]>;
export declare const getComputedProperty: <T, K extends keyof T>(obj: T, name: K) => TrackedComputedSubject<T[K]>;
