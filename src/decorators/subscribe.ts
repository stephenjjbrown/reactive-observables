import { Subscription } from "rxjs";
import { TrackedArray } from "../tracked-array";
import { TrackedEntity } from "../tracked-entity";
import { TrackedSubject } from "../tracked-subject";
import { getComputedProperty, getComputedPropertyList } from "./computed-property";
import { getTrackedProperty } from "./tracked-property";
import { getTrackedPropertyDefinitionList } from "./tracked-property-definition";


export function subscribe<T extends TObj[TKey], TObj, TKey extends keyof TObj>(obj: TObj, propertyName: TKey, observer: (value: T) => void): Subscription {
    const isComputed = getTrackedPropertyDefinitionList(obj)[propertyName]?.computed;

    if (isComputed) {
        return getComputedProperty(obj, propertyName)
            .subscribe(observer);
    } else {
        // TODO: Maybe find a way to better model types so any isn't necessary
        return (getTrackedProperty(obj, propertyName) as any)
            .subscribe(observer);
    }
}