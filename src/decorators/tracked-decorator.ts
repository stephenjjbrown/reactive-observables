import { registerTrackedPropertyDefinition } from "./tracked-property-definition";
import { getOrSetupTrackedProperty, getTrackedProperty } from "./tracked-property";

/**
 * Wraps property in getters and setters for a TrackedSubject or TrackedArray;
 */
export function tracked(prototype: any, propertyName: string): any {
    registerTrackedPropertyDefinition(prototype, propertyName, false)//, initialValue);

    return {
        set: function (value: any) {
            getOrSetupTrackedProperty(this, propertyName, value).value = value;
        },
        get: function() {
            return getTrackedProperty(this, propertyName).value;
        },
        enumerable: true,
        configurable: true
    }
}