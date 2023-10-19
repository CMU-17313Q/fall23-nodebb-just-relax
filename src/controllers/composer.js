"use strict";
// This is one of the two example TypeScript files included with the NodeBB repository
// It is meant to serve as an example to assist you with your HW1 translation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
const nconf_1 = __importDefault(require("nconf"));
const user_1 = __importDefault(require("../user"));
const plugins_1 = __importDefault(require("../plugins"));
const topics_1 = __importDefault(require("../topics"));
const posts_1 = __importDefault(require("../posts"));
const helpers_js_1 = __importDefault(require("./helpers.js"));
async function get(request, res, callback) {
    res.locals.metaTags = Object.assign(Object.assign({}, res.locals.metaTags), { name: 'robots', content: 'noindex' });
    const data = await plugins_1.default.hooks.fire('filter:composer.build', {
        req: request,
        res,
        next: callback,
        templateData: {},
    });
    if (res.headersSent) {
        return;
    }
    if (!(data === null || data === void 0 ? void 0 : data.templateData)) {
        callback(new Error('[[error:invalid-data]]'));
        return;
    }
    if (data.templateData.disabled) {
        res.render('', {
            title: '[[modules:composer.compose]]',
        });
    }
    else {
        data.templateData.title = '[[modules:composer.compose]]';
        res.render('compose', data.templateData);
    }
}
exports.get = get;
async function post(request, res) {
    const { body } = request;
    const data = {
        uid: request.uid,
        req: request,
        timestamp: Date.now(),
        content: body.content,
        fromQueue: false,
    };
    request.body.noscript = 'true';
    if (!data.content) {
        return await helpers_js_1.default.noScriptErrors(request, res, '[[error:invalid-data]]', 400);
    }
    async function queueOrPost(postFn, data) {
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const shouldQueue = await posts_1.default.shouldQueue(request.uid, data);
        if (shouldQueue) {
            delete data.req;
            // The next line calls a function in a module that has not been updated to TS yet
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            return await posts_1.default.addToQueue(data);
        }
        return postFn(data);
    }
    try {
        let result;
        if (body.tid) {
            data.tid = body.tid;
            result = await queueOrPost(topics_1.default.reply, data);
        }
        else if (body.cid) {
            data.cid = body.cid;
            data.title = body.title;
            data.tags = [];
            data.thumb = '';
            result = await queueOrPost(topics_1.default.post, data);
        }
        else {
            throw new Error('[[error:invalid-data]]');
        }
        if (result.queued) {
            res.redirect(`${nconf_1.default.get('relative_path') || '/'}?noScriptMessage=[[success:post-queued]]`);
            return;
        }
        const uid = result.uid ? result.uid : result.topicData.uid;
        // The next line calls a function in a module that has not been updated to TS yet
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        user_1.default.updateOnlineUsers(uid);
        const path = result.pid ? `/post/${result.pid}` : `/topic/${result.topicData.slug}`;
        res.redirect(nconf_1.default.get('relative_path') + path);
    }
    catch (error) {
        if (error instanceof Error) {
            await helpers_js_1.default.noScriptErrors(request, res, error.message, 400);
        }
    }
}
exports.post = post;
