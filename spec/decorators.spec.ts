import * as chai from "chai";
import { tracked, TrackedComputedSubject } from "../src/main";

describe("@tracked Property Decorator", () => {
    it("should wrap TrackedSubjects in getters and setters on a class", () => {

        class Test {
            @tracked
            foo: number = 3;

            @tracked
            arr: number[] = [1,2,3]

            computed = new TrackedComputedSubject(() => this.foo + this.arr.reduce((a,b) => a + b));

            constructor() {
                this.foo = 10;
                this.arr = [10];

                // Should be immutable
                chai.expect(() => this.arr.push(10)).to.throw();
                
                this.arr = [...this.arr, 10];

                chai.expect(this.computed.value).to.equal(30);
            }
        }

        const test = new Test();
    })
})