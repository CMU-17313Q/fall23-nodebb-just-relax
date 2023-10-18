

const posts = require('../../posts');
const privileges = require('../../privileges');
const api = require('../../api');
const helpers = require('../helpers');
const apiHelpers = require('../../api/helpers');

const Posts = module.exports;

Posts.get = async (request, res) => {
    helpers.formatApiResponse(200, res, await api.posts.get(request, { pid: request.params.pid }));
};

Posts.edit = async (request, res) => {
    const editResult = await api.posts.edit(request, {
        ...request.body,
        pid: request.params.pid,
        uid: request.uid,
        req: apiHelpers.buildReqObject(request),
    });

    helpers.formatApiResponse(200, res, editResult);
};

Posts.purge = async (request, res) => {
    await api.posts.purge(request, { pid: request.params.pid });
    helpers.formatApiResponse(200, res);
};

Posts.restore = async (request, res) => {
    await api.posts.restore(request, { pid: request.params.pid });
    helpers.formatApiResponse(200, res);
};

Posts.delete = async (request, res) => {
    await api.posts.delete(request, { pid: request.params.pid });
    helpers.formatApiResponse(200, res);
};

Posts.move = async (request, res) => {
    await api.posts.move(request, {
        pid: request.params.pid,
        tid: request.body.tid,
    });
    helpers.formatApiResponse(200, res);
};

async function mock(request) {
    const tid = await posts.getPostField(request.params.pid, 'tid');
    return { pid: request.params.pid, room_id: `topic_${tid}` };
}

Posts.vote = async (request, res) => {
    const data = await mock(request);
    if (request.body.delta > 0) {
        await api.posts.upvote(request, data);
    } else if (request.body.delta < 0) {
        await api.posts.downvote(request, data);
    } else {
        await api.posts.unvote(request, data);
    }

    helpers.formatApiResponse(200, res);
};

Posts.unvote = async (request, res) => {
    const data = await mock(request);
    await api.posts.unvote(request, data);
    helpers.formatApiResponse(200, res);
};

Posts.bookmark = async (request, res) => {
    const data = await mock(request);
    await api.posts.bookmark(request, data);
    helpers.formatApiResponse(200, res);
};

Posts.unbookmark = async (request, res) => {
    const data = await mock(request);
    await api.posts.unbookmark(request, data);
    helpers.formatApiResponse(200, res);
};

Posts.getDiffs = async (request, res) => {
    helpers.formatApiResponse(200, res, await api.posts.getDiffs(request, { ...request.params }));
};

Posts.loadDiff = async (request, res) => {
    helpers.formatApiResponse(200, res, await api.posts.loadDiff(request, { ...request.params }));
};

Posts.restoreDiff = async (request, res) => {
    helpers.formatApiResponse(200, res, await api.posts.restoreDiff(request, { ...request.params }));
};

Posts.deleteDiff = async (request, res) => {
    if (!Number.parseInt(request.params.pid, 10)) {
        throw new Error('[[error:invalid-data]]');
    }

    const cid = await posts.getCidByPid(request.params.pid);
    const [isAdmin, isModerator] = await Promise.all([
        privileges.users.isAdministrator(request.uid),
        privileges.users.isModerator(request.uid, cid),
    ]);

    if (!(isAdmin || isModerator)) {
        return helpers.formatApiResponse(403, res, new Error('[[error:no-privileges]]'));
    }

    await posts.diffs.delete(request.params.pid, request.params.timestamp, request.uid);

    helpers.formatApiResponse(200, res, await api.posts.getDiffs(request, { ...request.params }));
};
