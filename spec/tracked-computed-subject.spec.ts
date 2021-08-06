import * as chai from "chai";
import { expect } from "chai";
import { TrackedArray, TrackedComputedSubject, TrackedSubject } from "../src/main";

describe("TrackedComputedSubject", () => {
    it("should calculate combined value of other tracked values and update only as dependents update", () => {
        const a = new TrackedSubject(3);
        const b = new TrackedSubject(7);
        const c = new TrackedArray([1,2,3])

        let dCount = 0;
        const d = new TrackedComputedSubject(() => {
            dCount++;
            return c.value.reduce((a: any, b: any) => a+b);
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
    });


    it("should throw if circular dependencies detected", () => {

        const spy = chai.spy();

        const z = new TrackedSubject(false);

        const a = new TrackedComputedSubject(() => {
            return z.value ? b.value : null;
        });
        var  b = new TrackedComputedSubject(() => z.value ? a.value : null);

        a.onCircularDependencyFound = spy;
        b.onCircularDependencyFound = spy;

        chai.expect(() => {
            z.value = true;
        }).to.not.throw(); 

        chai.expect(spy).to.have.been.called.at.least(1);
    });

    // This error happened with an earlier implementation and should be prevented in future
    it("should not throw if same value is referenced twice in getter", () => {
        const spy = chai.spy();

        const z = new TrackedSubject(false);

        const a = new TrackedComputedSubject(() => 10);
        var  b = new TrackedComputedSubject(() => z.value ? a.value + a.value : null);

        a.onCircularDependencyFound = spy;
        b.onCircularDependencyFound = spy;

        chai.expect(() => {
            z.value = true;
        }).to.not.throw();        

        chai.expect(spy).to.not.have.been.called();
    });
});