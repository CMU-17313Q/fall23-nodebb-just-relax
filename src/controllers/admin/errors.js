

const json2csvAsync = require('json2csv').parseAsync;
const meta = require('../../meta');
const analytics = require('../../analytics');
const utils = require('../../utils');

const errorsController = module.exports;

errorsController.get = async function (request, res) {
    const data = await utils.promiseParallel({
        'not-found': meta.errors.get(true),
        analytics: analytics.getErrorAnalytics(),
    });
    res.render('admin/advanced/errors', data);
};

errorsController.export = async function (request, res) {
    const data = await meta.errors.get(false);
    const fields = data.length > 0 ? Object.keys(data[0]) : [];
    const options = { fields };
    const csv = await json2csvAsync(data, options);
    res.set('Content-Type', 'text/csv').set('Content-Disposition', 'attachment; filename="404.csv"').send(csv);
};
