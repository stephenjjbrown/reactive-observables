const chai = require("chai");
const { TrackedComputedSubject } = require("../src/tracked-computed-subject");
const { TrackedSubject } = require("../src/tracked-subject");
const { TrackedArray } = require("../src/tracked-array");

describe("TrackedComputedSubject", () => {
    it("should calculate combined value of other tracked values and update only as dependents update", () => {
        const a = new TrackedSubject(3);
        const b = new TrackedSubject(7);
        const c = new TrackedArray([1,2,3])

        let dCount = 0;
        const d = new TrackedComputedSubject(() => {
            dCount++;
            return c.value.reduce((a,b) => a+b);
        });

        let count = 0;
        const computed = new TrackedComputedSubject(() => {
            count++;
            return a.value + b.value + d.value;
        });

        chai.expect(computed.value).to.be.equal(16);

        c.value = [...c.value, 4];

        chai.expect(computed.value).to.be.equal(20);

        a.value = 30;
        b.value = 30;

        chai.expect(computed.value).to.equal(70);

        chai.expect(dCount).to.be.equal(2);
        chai.expect(count).to.equal(4);
    })
})