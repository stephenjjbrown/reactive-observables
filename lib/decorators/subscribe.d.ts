import { Subscription } from "rxjs";
export declare function subscribe<T extends TObj[TKey], TObj, TKey extends keyof TObj>(obj: TObj, propertyName: TKey, observer: (value: T) => void): Subscription;
