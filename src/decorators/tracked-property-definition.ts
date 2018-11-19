//Definitions of tracked properties on the prototype
interface TrackedPropertyDefinition<T> {
    computed: boolean;
}
type TrackedPropertyDefinitionList<T> = {
    [K in keyof T]: TrackedPropertyDefinition<T[K]>;
}

const TrackedPropertyDefinitionListKey = "_trackedPropertyDefinitions";

export const getTrackedPropertyDefinitionList = <T>(obj: T) => ((obj as any)[TrackedPropertyDefinitionListKey] = (obj as any)[TrackedPropertyDefinitionListKey] || {}) as TrackedPropertyDefinitionList<T>;

export const registerTrackedPropertyDefinition = <T, K extends keyof T>(proto: T, name: K, computed: boolean/*, initialValue: T[K]*/) => {
    const list = getTrackedPropertyDefinitionList(proto);
    list[name] = {
        computed
    };
}