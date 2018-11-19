(() => {
    const chai = require("chai");
    const { tracked } = require("../src/decorators");
    const { getTracked } = require("../src/decorators/tracked-property")
    const { TrackedComputedSubject } = require("../src/tracked-computed-subject");

    describe("@tracked Property Decorator", () => {
        it("should wrap TrackedSubjects in getters and setters on a class", () => {

            class Test {
                @tracked
                value: number = 3;

                @tracked
                coll: number[] = [1,2,3]

                computed = new TrackedComputedSubject(() => this.value + this.coll.reduce((a,b) => a + b));

                constructor() {
                    this.value = 10;
                    this.coll = [10];

                    // Should be immutable
                    chai.expect(() => this.coll.push(10)).to.throw();
                    
                    this.coll = [...this.coll, 10];

                    chai.expect(this.computed.value).to.equal(30);
                }
            }

            const test = new Test();
        })
    })
})()