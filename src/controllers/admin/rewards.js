
const admin = require('../../rewards/admin');

const rewardsController = module.exports;

rewardsController.get = async function (request, response) {
    const data = await admin.get();
    response.render('admin/extend/rewards', data);
};
