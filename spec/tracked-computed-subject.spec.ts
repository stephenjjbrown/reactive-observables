import * as chai from "chai";
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
        // const z = new TrackedSubject(false);
        // var b;
        // const a = new TrackedComputedSubject(() => {
        //     z.value //?
        //     b && b.value //?
        //     return z.value ? b.value : null
        // });
        // b = new TrackedComputedSubject(() => a.value);

        // z.value = true;
        // 1 //?
    })
});