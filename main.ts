import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, skip } from "rxjs/operators";





type Subscribable<T> = Observable<T> | Computed<T>;





class SubscribableManager {
    listenStack: Subscribable<any>[][] = [];
    get isListening() {
        return this.listenStack.length > 0;
    }

    subscribableAccessed(subscribable: Subscribable<any>) {
        if (this.isListening) {
            const top = this.listenStack[this.listenStack.length - 1];
            if (top.indexOf(subscribable) === -1)
                top.push(subscribable);
        }
    }

    startListening() {
        this.listenStack.push([]);
    }

    stopListening() {
        return this.listenStack.pop();
    }
}
const subscribableManager = new SubscribableManager();





class Observable<T> {
    subject: BehaviorSubject<T>;

    get value() {
        subscribableManager.subscribableAccessed(this);
        return this.subject.value;
    }

    set value(value) {
        this.subject.next(value);
    }

    constructor(initialValue: T) {
        this.subject = new BehaviorSubject(initialValue);
    }

    subscribe(observer: (value: T) => void) {
        return this.subject
            .pipe(distinctUntilChanged())
            .pipe(skip(1))
            .subscribe(observer);
    }
}





class Computed<T> {
    getter: () => T;

    subject: BehaviorSubject<T>;

    evaluateValue() {
        console.log('evaluate');
        subscribableManager.subscribableAccessed(this);
        subscribableManager.startListening();
        const val = this.getter();
        const dependencies = subscribableManager.stopListening();
        this.updateSubscriptions(dependencies);
        return val;
    }

    get value() {
        subscribableManager.subscribableAccessed(this);
        return this.subject.value;
    }

    _dependencies: Subscribable<any>[] = [];

    updateSubscriptions(dependencies: Subscribable<any>[]) {
        for (const subscribable of dependencies) {
            if (subscribable !== this && this._dependencies.indexOf(subscribable) === -1) {

                subscribable.subscribe(() => {
                    this.subject.next(this.evaluateValue());
                })

                this._dependencies.push(subscribable);
            }
        }
    }

    constructor(getter: () => T) {
        this.getter = getter;
        this.subject = new BehaviorSubject(this.evaluateValue());
    }

    subscribe(observer: (value: T) => void) {
        return this.subject
            .pipe(distinctUntilChanged())
            .pipe(skip(1))
            .subscribe(observer);
    }
}









const a = new Observable(3);

a.subscribe((value) => {
    console.log('newValue ' + value)
})

// a.value = 3

// a.value = 4

const b = new Computed(() => a.value + 3);

const c = new Computed(() => b.value + 10);

const d = new Computed(() => b.value + c.value);

b.value //?

c.value //?

d.value //?

a.value = 40;

b.value //?

c.value //?

d.value //?

a.value = 3;

d.value //?

d._dependencies.length //?


