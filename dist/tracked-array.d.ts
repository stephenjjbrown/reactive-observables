import { TrackedSubject } from "./tracked-subject";
export declare class TrackedArray<T> extends TrackedSubject<T[]> {
    value: T[];
    constructor(initialValue: T);
    push(item: T): void;
}
//# sourceMappingURL=tracked-array.d.ts.map