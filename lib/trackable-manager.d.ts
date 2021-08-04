import { Trackable } from "./trackable";
declare class TrackableManager {
    private listenerStack;
    private listenStack;
    private get isListening();
    trackableAccessed(subscribable: Trackable<any>): void;
    startListening(listener: Trackable<any>): void;
    stopListening(): Trackable<any>[];
}
export declare const trackableManager: TrackableManager;
export {};
