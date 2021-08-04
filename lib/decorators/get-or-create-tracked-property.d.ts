import { TrackedTypeForValue } from "../trackable";
export declare const getOrSetupTrackedProperty: <T, K extends keyof T>(obj: T, name: K, value: T[K]) => TrackedTypeForValue<T[K]>;
