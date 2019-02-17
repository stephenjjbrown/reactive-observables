import { TrackedSubject } from "./tracked-subject";
import { shallowEqualArrays } from "./shallow-equal";

export class TrackedArray<T> {
    subject: TrackedSubject<T[]>;

    get value() {
        const arr = [...this.subject.value];
        Object.freeze(arr);
        return arr;
    }

    set value(value) {
        if (!Array.isArray(value)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }
        this.subject.value = value;
    }

    constructor(initialValue: T[], compare?: (a: T[], b: T[]) => boolean) {
        if (!Array.isArray(initialValue)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }

        if (compare == null)
            compare = shallowEqualArrays;

        this.subject = new TrackedSubject(initialValue, compare);
    }

    get observable() {
        return this.subject.observable
    }

    subscribe(observer: (value: T[]) => void) {
        return this.observable.subscribe(observer)//?
    }
}