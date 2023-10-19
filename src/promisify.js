
const util = require('node:util');

module.exports = function (theModule, ignoreKeys) {
    ignoreKeys = ignoreKeys || [];
    function isCallbackedFunction(func) {
        if (typeof func !== 'function') {
            return false;
        }

        const string_ = func.toString().split('\n')[0];
        return string_.includes('callback)');
    }

    function isAsyncFunction(fn) {
        return fn && fn.constructor && fn.constructor.name === 'AsyncFunction';
    }

    function promisifyRecursive(module) {
        if (!module) {
            return;
        }

        const keys = Object.keys(module);
        for (const key of keys) {
            if (ignoreKeys.includes(key)) {
                /* eslint-disable no-continue */
                continue;
            }

            if (isAsyncFunction(module[key])) {
                module[key] = wrapCallback(module[key], util.callbackify(module[key]));
            } else if (isCallbackedFunction(module[key])) {
                module[key] = wrapPromise(module[key], util.promisify(module[key]));
            } else if (typeof module[key] === 'object') {
                promisifyRecursive(module[key]);
            }
        }
    }

    function wrapCallback(origFn, callbackFn) {
        return async function wrapperCallback(...args) {
            if (args.length > 0 && typeof args.at(-1) === 'function') {
                const cb = args.pop();
                args.push((error, res) => (res === undefined ? cb(error) : cb(error, res)));
                return callbackFn(...args);
            }

            return origFn(...args);
        };
    }

    function wrapPromise(origFn, promiseFn) {
        return function wrapperPromise(...args) {
            if (args.length > 0 && typeof args.at(-1) === 'function') {
                return origFn(...args);
            }

            return promiseFn(...args);
        };
    }

    promisifyRecursive(theModule);
};
