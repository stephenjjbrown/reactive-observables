import { TrackedArray } from "../src/tracked-array";
import { TrackedComputedSubject } from "../src/tracked-computed-subject";
import { TrackedEntity } from "./tracked-entity";
import { TrackedSubject } from "./tracked-subject";
declare type ElementOf<T extends Array<any>> = T[number];
declare type ReturnTypeOfReactive<T> = T extends any[] ? TrackedArray<ElementOf<T>> : T extends Function ? TrackedComputedSubject<T> : T extends Object ? TrackedSubject<T> | TrackedEntity<T> : TrackedSubject<T>;
export declare function reactive<T>(value: T): ReturnTypeOfReactive<T>;
export {};
