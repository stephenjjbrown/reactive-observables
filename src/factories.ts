import { TrackedArray } from "./tracked-array";
import { TrackedSubject } from "./tracked-subject";
import { TrackedComputedSubject } from "./tracked-computed-subject";
import { TrackedTypeForValue } from "./trackable";
import { TrackedEntity } from "../src/tracked-entity";
import { isTrackableEntity } from "./decorators";

export const createTracked = <T>(value: T): TrackedTypeForValue<T> => {
    if (Array.isArray(value)) {
        return new TrackedArray(value) as any;
    } else if (typeof value === "object" && isTrackableEntity(value)) {
        return new TrackedEntity(value) as any;
    } else {
        return new TrackedSubject(value) as any;
    }
}