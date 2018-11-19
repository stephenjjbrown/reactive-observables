import { createTracked } from "../factories";
import { TrackedTypeForValue } from "../trackable";
import { Subscription, merge } from "rxjs";
import { getTrackedPropertyDefinitionList } from "./tracked-property-definition";
import { TrackedComputedSubject } from "../tracked-computed-subject";

interface TrackedProperty<T> {
    subject: TrackedTypeForValue<T>;
}

type TrackedPropertyList<T> = {
    [K in keyof T]: TrackedProperty<T[K]>;
}

const TrackedPropertyListKey = "_trackedProperties";

const getTrackedPropertyList = <T>(obj: T) => ((obj as any)[TrackedPropertyListKey] = (obj as any)[TrackedPropertyListKey] || {}) as TrackedPropertyList<T>;

export const getOrSetupTrackedProperty = <T, K extends keyof T>(obj: T, name: K, value: T[K]): TrackedTypeForValue<T[K]> => {
    const list = getTrackedPropertyList(obj);
    const existing = list[name];

    if (!existing) {
        list[name] = {
            subject: createTracked(value as T[K])
        }
    }

    return list[name].subject;
}

export const getTrackedProperty = <T, K extends keyof T>(obj: T, name: K) => {
    const list = getTrackedPropertyList(obj);
    const existing = list[name];

    if (!existing) {
        throw new Error("Property accessed before initialized: " +  name);
    }

    return existing.subject;
}





export const getAllTrackedProperties = <T>(obj: T) => {
    const list = getTrackedPropertyDefinitionList(obj)



    return Object.keys(list)
        .map(key => ({
            key, 
            definition: list[key as keyof T]
        }))
        .map(({key, definition}) => {
            return definition.computed ?
                getComputedProperty(obj, key as keyof T) :
                getTrackedProperty(obj, key as keyof T)
        })
}

export const getAllObservables = <T>(obj: T) => {
    return getAllTrackedProperties(obj)
        .map(tracked => tracked.observable);
}

export const subscribeAll = <T>(obj: T, observer: (values: any) => void): Subscription => {
    return merge(...getAllObservables(obj))
        .subscribe(observer);
}







interface ComputedProperty<T> {
    subject: TrackedComputedSubject<T>;
}

type ComputedPropertyList<T> = {
    [K in keyof T]: ComputedProperty<T[K]>;
}

const ComputedPropertyListKey = "_computedProperties";

const getComputedPropertyList = <T>(obj: T) => ((obj as any)[ComputedPropertyListKey] = (obj as any)[ComputedPropertyListKey] || {}) as ComputedPropertyList<T>;

export const getOrSetupComputedProperty = <T, K extends keyof T>(obj: T, name: K, getter: () => T[K]): TrackedComputedSubject<T[K]> => {
    const list = getComputedPropertyList(obj);
    const existing = list[name];

    if (!existing) {
        const subject = new TrackedComputedSubject<T[K]>(getter.bind(obj))
        list[name] = {subject}
    }

    return list[name].subject;
}

export const getComputedProperty = <T, K extends keyof T>(obj: T, name: K): TrackedComputedSubject<T[K]> => {
    const list = getComputedPropertyList(obj);
    const existing = list[name];

    if (!existing) {
        throw new Error("Property accessed before initialized: " +  name);
    }

    return existing.subject;
}