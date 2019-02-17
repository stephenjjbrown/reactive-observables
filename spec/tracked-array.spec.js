const chai = require("chai");
const spy = require("chai-spies");
const { TrackedArray } = require("../src/tracked-array");
const { TrackedComputedSubject } = require("../src/tracked-computed-subject");

chai.use(spy);

describe("TrackedArray", () => {
    it("should return immutable array value", () => {
        const array = new TrackedArray([1,2,3]);
        const arr = array.value;

        chai.expect(() => arr.push(3)).to.throw();
    });

    it("should call subscribers when updated", () => {
        const array = new TrackedArray([1,2,3]);
        const spy = chai.spy();
        array.subscribe(spy);

        array.value = [1,2,3,4];

        chai.expect(spy).to.have.been.called();
    });

    it("should use shallow compare to determine whether to notify subscribers", () => {
        const array = new TrackedArray([1,2,3]);
        const spy = chai.spy();
        array.subscribe(spy);

        // Will not call subscribers, even though references are different
        array.value = [1,2,3];

        // Will notify subscribers both times -- i.e. not a deep equal
        array.value = [{a: 1}, {b: 2}];
        array.value = [{a: 1}, {b: 2}];

        chai.expect(spy).to.have.been.called(2);
    });

    it("should throw if attempting to assign non-array value", () => {
        chai.expect(() => {
            new TrackedArray(50);
        }).to.throw();

        chai.expect(() => {
            new TrackedArray([1,2,3]).value = 50;
        }).to.throw();

        const thing = [1,2,3];
    })
})