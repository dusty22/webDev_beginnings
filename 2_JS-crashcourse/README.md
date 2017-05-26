# JavaScript Crash Course

This repository is meant to teach the essential language features of JavaScript by developing a mock chat application from scratch - no libraries (assuming your browser supports all ES2015/ES6 features), except Jasmine.

Some features and syntax in Javascript are similar to Java, and some are not.

### How does this crash course work?

1. Clone the directory
2. Navigate to the `/src` directory and copy the full path of the `src/index.html` file into your browser (right click -> Run in Cloud9)
3. Notice that Jasmine unit tests are being run, but they're all failing
4. Fill out the code in `/src/js` so that the unit tests pass (don't be confused by the unit tests; they won't reference these files, but these are what you need to edit)
5. Reference the `/ref/js` directory if you get stuck

### Useful links:

* [ES2015 compatibility chart](https://kangax.github.io/compat-table/es6/)
* [Babel document on ES2015 features](https://babeljs.io/docs/learn-es2015/)
* [Mozilla JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

### Major concepts include:

* Object oriented features (classes, inheritance, etc.)

```javascript
class Sedan extends Vehicle {
    constructor(color) {
        this.color = color;
    }

    drive() {

    }
}

let s = new Sedan("Blue");
```

unlike Java...
- we have 'extends', 'super', and 'static', but not 'public', 'private', or 'implements' (interfaces)
- the constructor function is titled 'constructor' rather than with the class name
- we cannot use try or catch either in the exact same fashion


* Variable declarations (let and const)

```javascript
const numWheels = 4; // Cannot be reassigned
let color = "Blue" // May be reassigned
```

* Arrow functions

```javascript
cars.forEach(car => car.drive());
```

- the name of the argument you pass is semi-arbitrary
- don't overthink arrow functions; they are anonymous functions without all the extra syntax
- use brackets { } to enclose a function body after the arrow if you so choose


* Template strings

```javascript
const description = `The car is ${this.color} and has ${this.numWheels} wheels.`;
```

* Promises

```javascript
function waitAndGo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Done"), 1000);
    });
}

waitAndGo().then(message => {
    console.log(message);
});
```

- promises are basically code areas you are allowing to be 'asynchronous' 
- in other words, you don't mind if your code continues executing the next lines while it waits for the result to return 
- code is 'synchronous' if we are executing line-by-line, waiting for one line to finish before moving to the next
- promises have three states: pending, rejected, and fulfilled
- if you want promise actions (or other async operations) to execute in a certain order, chain together calls to .then()


* Maps and sets

```javascript
let m = new Map();
m.set(1, "one");
m.set(2, "two");
for(const [key, value] of m) console.log(key, value);

let s = new Set();
s.add("Sedan");
s.add("Sedan");
console.log(s); // Set {"Sedan"}
```

* Default, rest, and spread

```javascript
// Default
function greet(name = "Anonymous") {
    const output = `Hello ${name}`;
}

// Rest
function manyArgs(...args) {
    console.log(args.length);
}

// Spread
function addToArray(anArray) {
    someOtherArray.push(...anArray);
}
```

- these eliminate the need for using arguments[i] to access arguments
- this way you don't have to make assumptions about the number of arguments

* Destructuring

```javascript
function multipleReturns() {
    const result1 = 3.14;
    const result2 = 2.72;
    return [result1, result2];
}

let a, b;
[a, b] = multipleReturns(); // a = 3.14, b = 2.72
```

- now you have the POWAH to return multiple values, sort of?