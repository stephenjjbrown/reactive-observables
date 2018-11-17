import { TrackedSubject } from "./tracked-subject";

export class TrackedArray<T> extends TrackedSubject<T[]> {


    get value() {
        return super.value;
    }

    set value(value) {
        if (!Array.isArray(value)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }
        super.value = value;
    }

    constructor(initialValue: T) {
        if (!Array.isArray(initialValue)) {
            throw new Error("Trackable array must only be assigned an array as a value");
        }
        super(initialValue);
    }

    push(item: T) {
        const copy = this.value.slice();
        copy.push(item);
        this.value = copy;
    }
}