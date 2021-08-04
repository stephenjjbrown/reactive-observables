import * as chai from "chai";
import * as spy from "chai-spies";
import { computed, trackable, tracked, TrackedComputedSubject, TrackedEntity, TrackedSubject } from "../src/main";

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
                    this.total + this.total; // Call the getter twice
                    
                    // TODO: Double-check this test. Does this make sense?
                    // Ensure it's not just calling the regular class getter
                    chai.expect(this.count).to.equal(1);
                }
            }
            
            @trackable
            class Test {

                @tracked
                foo = 4;

                @tracked
                arr = [1,2,3];

                @tracked
                inner = new Inner();

                computed = new TrackedComputedSubject(() => this.arr.reduce((a,b) => a+b) + this.foo + this.inner.total)

                constructor() {
                }
            }

            const testObj = new Test();
            const test = new TrackedEntity(testObj);
            const spy = chai.spy();
            test.subscribe(spy);

            chai.expect(test.value.computed.value).to.equal(30);

            test.value.foo = 5;
            test.value.arr = [...test.value.arr, 10];
            test.value.inner.innerValue = 20;

            chai.expect(test.value.computed.value).to.equal(46);

            testObj.foo = 7; // This should call subscribers
            test.value = null as any; // Make sure subscription is removed when tracked entity is updated to a new value
            testObj.foo = 6; // This should not call subscribers

            chai.expect(spy).to.have.been.called(6);
        })
    });
