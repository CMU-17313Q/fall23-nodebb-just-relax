

const helpers = module.exports;
const winston = require('winston');
const middleware = require('../middleware');
const controllerHelpers = require('../controllers/helpers');

// Router, name, middleware(deprecated), middlewares(optional), controller
helpers.setupPageRoute = function (...args) {
    const [router, name] = args;
    let middlewares = args.length > 3 ? args.at(-2) : [];
    const controller = args.at(-1);

    if (args.length === 5) {
        winston.warn(`[helpers.setupPageRoute(${name})] passing \`middleware\` as the third param is deprecated, it can now be safely removed`);
    }

    middlewares = [
        middleware.authenticateRequest,
        middleware.maintenanceMode,
        middleware.registrationComplete,
        middleware.pluginHooks,
        ...middlewares,
        middleware.pageView,
    ];

    router.get(
        name,
        middleware.busyCheck,
        middlewares,
        middleware.buildHeader,
        helpers.tryRoute(controller),
    );
    router.get(`/api${name}`, middlewares, helpers.tryRoute(controller));
};

// Router, name, middleware(deprecated), middlewares(optional), controller
helpers.setupAdminPageRoute = function (...args) {
    const [router, name] = args;
    const middlewares = args.length > 3 ? args.at(-2) : [];
    const controller = args.at(-1);
    if (args.length === 5) {
        winston.warn(`[helpers.setupAdminPageRoute(${name})] passing \`middleware\` as the third param is deprecated, it can now be safely removed`);
    }

    router.get(name, middleware.admin.buildHeader, middlewares, helpers.tryRoute(controller));
    router.get(`/api${name}`, middlewares, helpers.tryRoute(controller));
};

// Router, verb, name, middlewares(optional), controller
helpers.setupApiRoute = function (...args) {
    const [router, verb, name] = args;
    let middlewares = args.length > 4 ? args.at(-2) : [];
    const controller = args.at(-1);

    middlewares = [
        middleware.authenticateRequest,
        middleware.maintenanceMode,
        middleware.registrationComplete,
        middleware.pluginHooks,
        ...middlewares,
    ];

    router[verb](name, middlewares, helpers.tryRoute(controller, (error, res) => {
        controllerHelpers.formatApiResponse(400, res, error);
    }));
};

helpers.tryRoute = function (controller, handler) {
    // `handler` is optional
    if (controller && controller.constructor && controller.constructor.name === 'AsyncFunction') {
        return async function (request, res, next) {
            try {
                await controller(request, res, next);
            } catch (error) {
                if (handler) {
                    return handler(error, res);
                }

                next(error);
            }
        };
    }

    return controller;
};
