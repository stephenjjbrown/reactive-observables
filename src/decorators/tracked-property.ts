import { createTracked } from "../factories";
import { TrackedTypeForValue } from "../trackable";
import { Subscription, merge } from "rxjs";
import { getTrackedPropertyDefinitionList } from "./tracked-property-definition";
import { getComputedProperty } from "./computed-property";

interface TrackedProperty<T> {
    subject: TrackedTypeForValue<T>;
}

type TrackedPropertyList<T> = {
    [K in keyof T]: TrackedProperty<T[K]>;
}

const TrackedPropertyListKey = "_trackedProperties";

const getTrackedPropertyList = <T>(obj: T) => ((obj as any)[TrackedPropertyListKey] = (obj as any)[TrackedPropertyListKey] || {}) as TrackedPropertyList<T>;

export const getTrackedProperty = <T, K extends keyof T>(obj: T, name: K, notFound?: (list: TrackedPropertyList<T>, name: K) => TrackedTypeForValue<T[K]>) => {
    const list = getTrackedPropertyList(obj);
    const existing = list[name];

    if (!existing) {
        if (notFound)
            return notFound(list, name)
        else
            throw new Error("Property accessed before initialized or property doesn't exist: " +  name);
    }

    return existing.subject;
}

// Moved here to avoid circular dependencies
export const getOrSetupTrackedProperty = <T, K extends keyof T>(obj: T, name: K, value: T[K]): TrackedTypeForValue<T[K]> => {
    return getTrackedProperty(obj, name, list => (list[name] = {
            subject: createTracked(value as T[K])
        }).subject);
}









export const getAllTrackedProperties = <T>(obj: T) => {
    const list = getTrackedPropertyDefinitionList(obj)

    return Object.keys(list)
        .map(key => ({
            key, 
            definition: list[key as keyof T]
        }))
        .map(({key, definition}) => {
            
            // // If someone tries to subscribe to a tracked entity without having read a computed,
            // // The computed will not yet be initialized and the application will throw
            // // Merely reading the property ensures getOrSetupComputed gets called and property is initialized
            // // TODO: Write a test which subscribes to a tracked entity with a computed without having called or read the
            // // computed in the constructor first (all existing tests read the computed in the constructor as part of the test)
            // obj[key as keyof T];
            // 4-18-2020 moved to getComputedProperty;

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