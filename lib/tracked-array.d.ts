import { TrackedSubject } from "./tracked-subject";
export declare class TrackedArray<T> extends TrackedSubject<T[]> {
    value: T[];
    constructor(initialValue: T[], compare?: (a: T[], b: T[]) => boolean);
}
//# sourceMappingURL=tracked-array.d.ts.map