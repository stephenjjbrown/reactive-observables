import * as chai from "chai";
import * as spy from "chai-spies";
import { subscribe } from "../src/decorators/subscribe";
import { computed, getComputedProperty, getTrackedProperty, tracked, TrackedComputedSubject } from "../src/main";

chai.use(spy);

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

                
                // Testing subscribe function on decorated properties
                const spy = chai.spy();

                subscribe(this, "foo", spy); // TrackedSubject
                subscribe(this, "arr", spy); // TrackedArray

                this.foo = 100;
                this.arr = [100];
                chai.expect(spy).to.be.called.exactly(2);

                chai.expect(() => {
                    subscribe(this, "doesntexist" as any, spy);
                }).to.throw();
                
                
            }
        }


        const test = new Test();
    })
});

describe("@computed Property Decorator", () => {
    it("should wrap TrackedComputedSubjects in getters and setters on a class", () => {

        class Bar {
            @tracked
            baz = 4;

            @computed
            get foo() {
                return this.baz * 3;
            }

            constructor() {
                this.baz = 1;

                // Testing subscribe function on decorated properties
                const spy = chai.spy();

                subscribe(this, "foo", spy);

                const subscription = subscribe(this, "foo", value => {
                    chai.expect(value).to.equal(15);
                });

                this.baz = 5;

                chai.expect(spy).to.be.called.exactly(1);

                // chai.expect(() => {
                //     subscribe(this, "doesntexist" as any, spy);
                // }).to.throw();
            }
        }

        chai.expect(() => new Bar()).to.not.throw();
    });
});