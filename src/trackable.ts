import { TrackedSubject } from "./tracked-subject";
import { TrackedComputedSubject } from "./tracked-computed-subject";
import { TrackedArray } from "./tracked-array";
import { TrackedEntity } from "./tracked-entity";

// Technically I think this would include TrackedArray now since TrackedArray no longer inherits from TrackedSubject
// TODO: Use interface instead of Union Type? TrackedArray basically matches the interface of TrackedSubject anyway
export type Trackable<T> = TrackedSubject<T> | TrackedComputedSubject<T>;

export type TrackedTypeForValue<T> = T extends (infer K)[] ? TrackedArray<K> : (TrackedSubject<T> | TrackedEntity<T>)