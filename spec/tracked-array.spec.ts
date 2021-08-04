import * as chai from "chai";
import * as spy from "chai-spies";
import { TrackedArray } from "../src/main";

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

        chai.expect(spy).to.have.been.called(1);
    });

    it("should use shallow compare to determine whether to notify subscribers", () => {
        const initialArray = [1,2,3];
        const array = new TrackedArray(initialArray);
        const spy = chai.spy();
        array.subscribe(spy);

        // Will not call subscribers, even though references are different
        array.value = [1,2,3];
        array.value = initialArray; // exactly equal/identical

        // Will notify subscribers both times -- i.e. not a deep equal
        array.value = [{a: 1}, {b: 2}] as any;
        array.value = [{a: 1}, {b: 2}] as any;

        chai.expect(spy).to.have.been.called(2);
    });

    it("should throw if attempting to assign non-array value", () => {
        chai.expect(() => {
            new TrackedArray(50 as any);
        }).to.throw();

        chai.expect(() => {
            new TrackedArray([1,2,3]).value = 50 as any;
        }).to.throw();

        const thing = [1,2,3];
    })
});