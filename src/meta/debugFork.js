

const { fork } = require('node:child_process');

let debugArg = process.execArgv.find(arg => /^--(debug|inspect)/.test(arg));
const debugging = Boolean(debugArg);

debugArg = debugArg ? debugArg.replace('-brk', '').split('=') : ['--debug', 5859];
let lastAddress = Number.parseInt(debugArg[1], 10);

/**
 * Child-process.fork, but safe for use in debuggers
 * @param {string} modulePath
 * @param {string[]} [args]
 * @param {any} [options]
 */
function debugFork(modulePath, args, options) {
    let execArgv = [];
    if (global.v8debug || debugging) {
        lastAddress += 1;

        execArgv = [`${debugArg[0]}=${lastAddress}`, '--nolazy'];
    }

    if (!Array.isArray(args)) {
        options = args;
        args = [];
    }

    options = options || {};
    options = { ...options, execArgv };

    return fork(modulePath, args, options);
}

debugFork.debugging = debugging;

module.exports = debugFork;
