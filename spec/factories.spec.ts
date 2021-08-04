import * as chai from "chai";
import { createTracked, TrackedArray, TrackedSubject } from "../src/main";
import { shallowEqualArrays } from "../src/shallow-equal";

describe("createTracked", () => {
    it("should create TrackedArray if given an array", () => {
        const tracked = createTracked([1,2,3]);

        chai.expect(tracked).to.be.instanceOf(TrackedArray);
        chai.expect(shallowEqualArrays(tracked.value, [1,2,3])).to.be.true;
    })

    it("should create TrackedSubject if given a non-array", () => {
        const tracked = createTracked(35);

        chai.expect(tracked).to.be.instanceOf(TrackedSubject);
        chai.expect(tracked.value).to.equal(35);
    })
});