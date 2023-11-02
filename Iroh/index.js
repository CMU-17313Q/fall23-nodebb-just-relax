/* eslint-disable no-eval */

'use strict';

function buildCallStack(callStack, indent = 0) {
    let output = '';
    const currentCall = callStack.shift();

    if (currentCall) {
        output += `${' '.repeat(indent)}call ${currentCall.name} ( [ ${currentCall.args.join(', ')} ] )\n`;

        if (currentCall.func) {
            // Execute the function and store the result
            currentCall.result = currentCall.func(...currentCall.args);
        }

        if (currentCall.children && currentCall.children.length > 0) {
            output += buildCallStack(currentCall.children, indent + 2);
        }

        output += `${' '.repeat(indent)}call ${currentCall.name} end -> [ ${currentCall.result} ]\n`;
    }

    return output;
}

class Call {
    constructor(name, args, func) {
        this.name = name;
        this.args = args;
        this.children = [];
        this.result = null;
        this.func = func; // Store the function to be executed
    }
}

// Define some functions
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function square(x) {
    return x * x;
}

// Simulate a call stack with actual function calls
const programCall = new Call('Program', []);
const factorial3Call = new Call('factorial', [3], factorial);
const square2Call = new Call('square', [2], square);

programCall.children.push(factorial3Call);
programCall.children.push(square2Call);

// Build the call stack as a string
const callStackString = buildCallStack([programCall]);
console.log(callStackString);
