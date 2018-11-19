import { registerTrackedPropertyDefinition } from "./tracked-property-definition";
import { getOrSetupComputedProperty } from "./computed-property";

export function computed(proto: any, propertyName: string, descriptor: any) {
    registerTrackedPropertyDefinition(proto, propertyName, true);

    const getter = descriptor.get;

    descriptor.get = function() {
        return getOrSetupComputedProperty(this, propertyName, getter).value;
    }

    return descriptor;
}