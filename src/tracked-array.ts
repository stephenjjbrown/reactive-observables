import { TrackedSubject } from "./tracked-subject";
import { shallowEqualArrays } from "./shallow-equal";

export class TrackedArray<T> extends TrackedSubject<T[]> {
    get value() {
        const arr = [...super.value];
        Object.freeze(arr);
        return arr;
    }

    set value(value) {
        if (!Array.isArray(value)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }
        super.value = value;
    }

    constructor(initialValue: T[], compare?: (a: T[], b: T[]) => boolean) {
        if (!Array.isArray(initialValue)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }

        if (compare == null)
            compare = shallowEqualArrays;

        super(initialValue, compare);
    }
}