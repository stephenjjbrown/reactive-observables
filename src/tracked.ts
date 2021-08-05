import { isTrackableEntity } from "../src/decorators";
import { TrackedArray } from "../src/tracked-array"
import { TrackedComputedSubject } from "../src/tracked-computed-subject";
import { TrackedEntity } from "./tracked-entity";
import { TrackedSubject } from "./tracked-subject";



type ElementOf<T extends Array<any>> = T[number];


type ReturnTypeOfReactive<T> =
    T extends any[] ?
        TrackedArray<ElementOf<T>> :
    T extends Function ?
        TrackedComputedSubject<T> :
    T extends Object ?
        TrackedSubject<T> | TrackedEntity<T> :
    TrackedSubject<T>

export function reactive<T>(value: T): ReturnTypeOfReactive<T> {
    if (Array.isArray(value)) {
        return new TrackedArray(value) as any;
    } else if (value instanceof Function) {
        return new TrackedComputedSubject(value as any) as any;
    } else if (isTrackableEntity(value)) {
        return new TrackedEntity(value) as any;
    } else {
        return new TrackedSubject(value) as any;
    }
}