import { TrackableSubject } from "./trackable-subject";
import { TrackableComputedSubject } from "./trackable-computed-subject";

export type Trackable<T> = TrackableSubject<T> | TrackableComputedSubject<T>;