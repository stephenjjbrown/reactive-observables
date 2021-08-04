import * as chai from "chai";
import { computed, getComputedProperty, getTrackedProperty, tracked, TrackedComputedSubject } from "../src/main";

describe("@tracked Property Decorator", () => {
    it("should wrap TrackedSubjects in getters and setters on a class", () => {

        class Test {
            @tracked
            foo: number = 3;

            @tracked
            arr: number[] = [1,2,3]

            @tracked
            never;

            computed = new TrackedComputedSubject(() => this.foo + this.arr.reduce((a,b) => a + b));

            constructor() {
                this.foo = 10;
                this.arr = [10];

                // Should be immutable
                chai.expect(() => this.arr.push(10)).to.throw();
                
                this.arr = [...this.arr, 10];

                chai.expect(this.computed.value).to.equal(30);

                // Perhaps it should return undefined?
                // For now, throw if tracked not initialized
                chai.expect(() => {
                    this.never;
                    //getTrackedProperty(this, "never").value
                }).to.throw();
            }
        }

        const test = new Test();
    })
});

describe("@computed Property Decorator", () => {
    class Bar {
        @tracked
        baz = 4;

        @computed
        get foo() {
            return this.baz * 3;
        }

        constructor() {
            getComputedProperty(this, "foo")
                .subscribe(value => {
                    chai.expect(value).to.equal(15);
                });

            this.baz = 5;
        }
    }

    chai.expect(() => new Bar()).to.not.throw();
}) 