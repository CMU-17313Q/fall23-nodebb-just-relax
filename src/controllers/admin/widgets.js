
const widgetsController = module.exports;
const admin = require('../../widgets/admin');

widgetsController.get = async function (request, response) {
    const data = await admin.get();
    response.render('admin/extend/widgets', data);
};
