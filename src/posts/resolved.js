/**
 * This file is called from
 * routes -->
 * /src/controllers/write/posts.js function Posts.resolve -->
 * /src/api/posts.js function postsAPI.resolve -->
 * /src/api/helpers.js function exports.postCommand -->
 * /src/api/helpers.js function executeCommand -->
 * await posts[command](data.pid, caller.uid)
 * -huda
 * huda created this file
 */

'use strict';

module.exports = function(Posts) {
    Posts.resolve = async function(pid, uid) {
        return await resolve('resolve', pid, uid);
        // This can maybe become resolveOrUnresolve eventually
    }

    async function resolve(type, pid, uid) {
        const isResolving = type === 'resolve';

        // Check if the user is logged in
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }
        // Fetch the post data (you might need to implement this method)
        const postData = await Posts.getPostFields(pid, ['pid', 'uid', 'resolved']);
        
        // Check if the post is already resolved or not
        if (isResolving && postData.resolved) {
            throw new Error('[[error:already-resolved]]');
        }

        if (!isResolving && !postData.resolved) {
            throw new Error('[[error:already-unresolved]]');
        }

        // Update the resolved status
        await Posts.setPostField(pid, 'resolved', isResolving);

        return {
            post: postData,
            isResolved: isResolving,
        };
    }
}