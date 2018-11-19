import { Trackable } from "./trackable";
declare class TrackableManager {
    private listenerStack;
    private listenStack;
    private readonly isListening;
    trackableAccessed(subscribable: Trackable<any>): void;
    startListening(listener: Trackable<any>): void;
    stopListening(): Trackable<any>[];
}
export declare const trackableManager: TrackableManager;
export {};
//# sourceMappingURL=trackable-manager.d.ts.map