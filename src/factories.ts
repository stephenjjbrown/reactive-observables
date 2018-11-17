import { TrackedArray } from "./tracked-array";
import { TrackedSubject } from "./tracked-subject";
import { TrackedComputedSubject } from "./tracked-computed-subject";
import { TrackedTypeForValue } from "./trackable";

export const createTracked = <T>(value: T): TrackedTypeForValue<T> => {
    if (Array.isArray(value)) {
        return new TrackedArray(value) as any;
    } else {
        return new TrackedSubject(value) as any;
    }
}

export const createComputed = <T>(getter: () => T) => {
    return new TrackedComputedSubject(getter);
}