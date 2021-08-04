interface TrackedPropertyDefinition<T> {
    computed: boolean;
}
declare type TrackedPropertyDefinitionList<T> = {
    [K in keyof T]: TrackedPropertyDefinition<T[K]>;
};
export declare const getTrackedPropertyDefinitionList: <T>(obj: T) => TrackedPropertyDefinitionList<T>;
export declare const registerTrackedPropertyDefinition: <T, K extends keyof T>(proto: T, name: K, computed: boolean) => void;
export {};
