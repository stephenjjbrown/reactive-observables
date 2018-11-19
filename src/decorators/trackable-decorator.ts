const TrackableEntityKey = "_trackableEntity";

/**
 * Decorator for classes, allows them and their properties to be tracked using a TrackedEntity
 * @param constructor 
 */
export function trackable(constructor: any) {
    constructor.prototype[TrackableEntityKey] = true;
}

export const isTrackableEntity = (obj: any) => {
    return obj[TrackableEntityKey] === true;
}