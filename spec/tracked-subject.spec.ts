import * as chai from "chai";
import * as spies from "chai-spies";
import { TrackedSubject } from "../src/main";

chai.use(spies);

describe("TrackedSubject", () => {
    const initialValue = 3;
    let subject;
    let spy;

    beforeEach(() => {
        subject = new TrackedSubject(initialValue);
        spy = chai.spy();
        subject.subscribe(spy);
    })

    it("should call back subscribers when value changed", () => {
        subject.value = 4;
        chai.expect(spy).to.have.been.called.once;
    });

    it("should not call back subscribers when value changed to same value", () => {
        subject.value = initialValue;
        chai.expect(spy).to.not.have.been.called();
    });

    it("should use === for comparison", () => {
        // Each value should be considered different from the previous to make sure it's not == or deepEqual comparison
        subject.value = undefined;
        subject.value = null;
        subject.value = NaN;
        subject.value = NaN;
        subject.value = [1,2];
        subject.value = [1,2];

        chai.expect(spy).to.have.been.called.exactly(6);
    })

    it("should allow custom compare function", () => {
        const customSubject = new TrackedSubject(initialValue, (a, b) => a == b);
        const customSpy = chai.spy();
        customSubject.subscribe(customSpy);

        // For == undefined and null will be considered the same. Hence 5 instead of 6
        customSubject.value = undefined as any;
        customSubject.value = null as any;
        customSubject.value = NaN;
        customSubject.value = NaN;
        customSubject.value = [1,2] as any;
        customSubject.value = [1,2] as any;

        chai.expect(customSpy).to.have.been.called.exactly(5);
    });
});