import { TrackedComputedSubject } from "./tracked-computed-subject";
import { TrackedTypeForValue } from "./trackable";
export declare const createTracked: <T>(value: T) => TrackedTypeForValue<T>;
export declare const createComputed: <T>(getter: () => T) => TrackedComputedSubject<T>;
//# sourceMappingURL=factories.d.ts.map