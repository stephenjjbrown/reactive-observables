import { TrackedEntity } from "../lib/tracked-entity";

(() =>{
    const chai = require("chai");
    const spy = require("chai-spies")
    const { trackable, tracked, computed } = require("../src/decorators");
    const { getTracked } = require("../src/decorators/tracked-property")
    const { TrackedComputedSubject } = require("../src/tracked-computed-subject");
    const { TrackedEntity } = require("../src/tracked-entity");
    const { TrackedSubject } = require("../src/tracked-subject");

    chai.use(spy)

    describe("@trackable Class Decorator", () => {
        it("should update when properties update", () => {
            const externalThing = new TrackedSubject(1);

            @trackable
            class Inner {

                count = 0;

                @tracked
                innerValue = 15;

                @computed
                get total() {
                    this.count++;
                    return this.innerValue + 4 + externalThing.value;
                }

                constructor() {
                    const test = this.total + this.total
                    
                    // Ensure it's not just calling the regular class getter
                    chai.expect(this.count).to.equal(1);
                }
            }
            
            @trackable
            class Test {

                @tracked
                thingo = 4;

                @tracked
                arr = [1,2,3];

                @tracked
                inner = new Inner();

                computed = new TrackedComputedSubject(() => this.arr.reduce((a,b) => a+b) + this.thingo + this.inner.total)

                constructor() {
                }
            }


            const test = new TrackedEntity(new Test()) as TrackedEntity<Test>;
            const spy = chai.spy();
            test.subscribe(spy);

            chai.expect(test.value.computed.value).to.equal(30);

            test.value.thingo = 5;
            test.value.arr = [...test.value.arr, 10];
            test.value.inner.innerValue = 20;

            chai.expect(test.value.computed.value).to.equal(46);

            chai.expect(spy).to.have.been.called(4);
        })
    })
})()
