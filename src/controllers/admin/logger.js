
const loggerController = module.exports;

loggerController.get = function (request, response) {
    response.render('admin/development/logger', {});
};
