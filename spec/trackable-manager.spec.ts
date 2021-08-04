import * as chai from "chai";
import { trackableManager } from "../src/trackable-manager";
import { TrackedComputedSubject } from "../src/tracked-computed-subject";

describe("TrackableManager", () => {
    it("Should throw if listener stack is malformed", () => {

        chai.expect(() => {
            new TrackedComputedSubject(() => {
                // This should never happen and should throw error;
                (trackableManager as any).listenStack.pop();
            });
        }).to.throw();
    });
});