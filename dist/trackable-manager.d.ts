import { Trackable } from "./trackable";
declare class TrackableManager {
    private listenStack;
    private readonly isListening;
    trackableAccessed(subscribable: Trackable<any>): void;
    startListening(): void;
    stopListening(): Trackable<any>[];
}
export declare const trackableManager: TrackableManager;
export {};
//# sourceMappingURL=trackable-manager.d.ts.map