import { TrackedTypeForValue } from "./trackable";
import { Subscription, Subscribable, merge, Observable, from, empty } from "rxjs";
import { TrackedSubject } from "./tracked-subject";
import { TrackedArray } from "./tracked-array";
import { createTracked } from "./factories";
import { TrackedEntity } from "./tracked-entity";






// Definitions of tracked properties on the prototype
interface TrackedPropertyDefinition<T> {
    initialValue: T;
    isArray: boolean;
}
type TrackedPropertyDefinitionList<T> = {
    [K in keyof T]: TrackedPropertyDefinition<T[K]>;
}

const TrackedPropertyDefinitionListKey = "_trackedPropertyDefinitions";

const getTrackedPropertyDefinitionList = <T>(obj: T) => ((obj as any)[TrackedPropertyDefinitionListKey] = (obj as any)[TrackedPropertyDefinitionListKey] || {}) as TrackedPropertyDefinitionList<T>;

const registerTrackedPropertyDefinition = <T, K extends keyof T>(proto: T, name: K, initialValue: T[K]) => {
    const list = getTrackedPropertyDefinitionList(proto);
    list[name] = {
        initialValue,
        isArray: Array.isArray(initialValue)
    }
}





interface TrackedProperty<T> {
    subject: TrackedTypeForValue<T>;
}

type TrackedPropertyList<T> = {
    [K in keyof T]: TrackedProperty<T[K]>;
}

const TrackedPropertyListKey = "_trackedProperties";

const getTrackedPropertyList = <T>(obj: T) => ((obj as any)[TrackedPropertyListKey] = (obj as any)[TrackedPropertyListKey] || {}) as TrackedPropertyList<T>;

const getTrackedProperty = <T, K extends keyof T>(obj: T, name: K): TrackedProperty<T[K]> => {
    const list = getTrackedPropertyList(obj);
    return list[name] = list[name] || {
        subject: createTracked( getTrackedPropertyDefinitionList(obj)[name].initialValue )
    }
}




export const getTracked = <T, K extends keyof T>(obj: T, name: K): TrackedTypeForValue<T[K]> => {
    return getTrackedProperty(obj, name).subject;
}



export const getAllTrackedProperties = <T>(obj: T) => {
    return Object.keys(getTrackedPropertyDefinitionList(obj))
        .map(key => getTracked(obj, key as keyof T))
}

export const getAllObservables = <T>(obj: T) => {
    return getAllTrackedProperties(obj)
        .map(tracked => tracked.distinctObservable);
}

export const subscribeAll = <T>(obj: T, observer: (values: any) => void): Subscription => {
    return merge(...getAllObservables(obj))
        .subscribe(observer);
}




/**
 * Wraps property in getters and setters for a TrackedSubject or TrackedArray;
 */
export function tracked<T>(initialValue: T) {
    return function(prototype: any, propertyName: string): any {
        registerTrackedPropertyDefinition(prototype, propertyName, initialValue);
        //addTrackedPropertyName(prototype, propertyName);
    
        return {
            set: function (value: any) {
                getTrackedProperty(this, propertyName).subject.value = value;
                //getTracked(this, propertyName, initialValue).value = value;
            },
            get: function() {
                return getTrackedProperty(this, propertyName).subject.value;
                //return getTracked(this, propertyName, initialValue).value;
            },
            enumerable: true,
            configurable: true
        }
    }
}


const TrackableEntityKey = "_trackableEntity";

export function trackable(constructor: any) {
    constructor.prototype[TrackableEntityKey] = true;
}

export const isTrackableEntity = (obj: any) => {
    return obj[TrackableEntityKey] === true;
}







@trackable
class Car {
    @tracked(4)
    wheel: number;

    @tracked([])
    strings: string[];

    constructor() {

    }
}

const a = new Car();
const b = new Car();


TrackedEntity //?

const c = new TrackedEntity(a)

c.subscribe(() => console.log('changed'))

a.wheel = 6
a.wheel = 7;
a.strings = []

c.value = b;

a.wheel = 5;

