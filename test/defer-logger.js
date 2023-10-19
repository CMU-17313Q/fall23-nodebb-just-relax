
const winston = require('winston');
const Transport = require('winston-transport');

const winstonLogged = [];

class DeferLogger extends Transport {
    constructor(options) {
        super(options);
        this.logged = options.logged;
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        this.logged.push([info.level, info.message]);
        callback();
    }
}

before(() => {
    // Defer winston logs until the end
    winston.clear();

    winston.add(new DeferLogger({ logged: winstonLogged }));
});

after(() => {
    console.log('\n\n');

    for (const args of winstonLogged) {
        console.log(`${args[0]} ${args[1]}`);
    }
});
