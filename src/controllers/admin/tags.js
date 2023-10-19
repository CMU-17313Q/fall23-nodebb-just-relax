
const topics = require('../../topics');

const tagsController = module.exports;

tagsController.get = async function (request, response) {
    const tags = await topics.getTags(0, 199);
    response.render('admin/manage/tags', { tags });
};
