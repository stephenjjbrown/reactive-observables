import { TrackedSubject } from "./tracked-subject";
import { TrackedComputedSubject } from "./tracked-computed-subject";
import { TrackedArray } from "./tracked-array";
import { TrackedEntity } from "./tracked-entity";
export declare type Trackable<T> = TrackedSubject<T> | TrackedComputedSubject<T>;
export declare type TrackedTypeForValue<T> = T extends (infer K)[] ? TrackedArray<K> : (TrackedSubject<T> | TrackedEntity<T>);
//# sourceMappingURL=trackable.d.ts.map