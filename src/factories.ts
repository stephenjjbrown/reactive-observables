import { TrackedArray } from "./tracked-array";
import { TrackedSubject } from "./tracked-subject";
import { TrackedTypeForValue } from "./trackable";
import { TrackedEntity } from "./tracked-entity";
import { isTrackableEntity } from "./decorators/trackable-decorator";

export const createTracked = <T>(value: T): TrackedTypeForValue<T> => {
    if (Array.isArray(value)) {
        return new TrackedArray(value) as any;
    } else if (isTrackableEntity(value)) {
        return new TrackedEntity(value) as any;
    } else {
        return new TrackedSubject(value) as any;
    }
}