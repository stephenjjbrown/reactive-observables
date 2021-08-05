import * as chai from "chai";
import { trackable } from "../src/decorators";
import { reactive } from "../src/tracked";
import { TrackedArray } from "../src/tracked-array";
import { TrackedComputedSubject } from "../src/tracked-computed-subject";
import { TrackedEntity } from "../src/tracked-entity";
import { TrackedSubject } from "../src/tracked-subject";

describe("reactive Helper Function", () => {
    it("should create a TrackedArray when called with an array", () => {
        const value = reactive([1, 2, 3]);

        chai.expect(value).to.be.instanceOf(TrackedArray);
    });

    it("should create a TrackedComputedSubject when called with a function", () => {
        const value = reactive(() => 1 + 2);

        chai.expect(value).to.be.instanceOf(TrackedComputedSubject);
    });

    it("should create a TrackedEntity when called with a @trackable", () => {
        @trackable
        class Foo { }

        const value = reactive(new Foo());

        chai.expect(value).to.be.instanceOf(TrackedEntity);
    });

    it("should create a TrackedSubject when called with any other value", () => {
        const value = reactive(500);

        chai.expect(value).to.be.instanceOf(TrackedSubject);
    });
});