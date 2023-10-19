
const validator = require('validator');
const winston = require('winston');
const meta = require('../../meta');

const logsController = module.exports;

logsController.get = async function (request, response) {
    let logs = '';
    try {
        logs = await meta.logs.get();
    } catch (error) {
        winston.error(error.stack);
    }

    response.render('admin/advanced/logs', {
        data: validator.escape(logs),
    });
};
