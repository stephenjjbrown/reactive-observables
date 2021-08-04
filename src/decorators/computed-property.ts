import { TrackedComputedSubject } from "../tracked-computed-subject";

interface ComputedProperty<T> {
    subject: TrackedComputedSubject<T>;
}

type ComputedPropertyList<T> = {
    [K in keyof T]: ComputedProperty<T[K]>;
};

const ComputedPropertyListKey = "_computedProperties";

const getComputedPropertyList = <T>(obj: T) => ((obj as any)[ComputedPropertyListKey] = (obj as any)[ComputedPropertyListKey] || {}) as ComputedPropertyList<T>;

export const getOrSetupComputedProperty = <T, K extends keyof T>(obj: T, name: K, getter: () => T[K]): TrackedComputedSubject<T[K]> => {
    const list = getComputedPropertyList(obj);
    const existing = list[name];
    if (!existing) {
        const subject = new TrackedComputedSubject<T[K]>(getter.bind(obj));
        list[name] = { subject };
    }
    return list[name].subject;
};

export const getComputedProperty = <T, K extends keyof T>(obj: T, name: K): TrackedComputedSubject<T[K]> => {
    const list = getComputedPropertyList(obj);

    if (!list[name]) {
        obj[name]; // Has not been initialized, so initialized it now
        // Lazy initialization seems to be the correct step here? See the long comment in tracked-property.ts
        //console.info("computed initialized lazily via getComputedProperty", obj, name, list);
        //throw new Error("Property accessed before initialized: " + name);
    }

    return list[name].subject;
};