import { getTrackedProperty } from "./tracked-property";
import { TrackedTypeForValue } from "../trackable";
import { createTracked } from "../factories";

// Moved here to avoid circular dependencies
export const getOrSetupTrackedProperty = <T, K extends keyof T>(obj: T, name: K, value: T[K]): TrackedTypeForValue<T[K]> => {
    return getTrackedProperty(obj, name, list => (list[name] = {
            subject: createTracked(value as T[K])
        }).subject);
}