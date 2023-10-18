

const async = require('async');
const db = require('../../database');

module.exports = {
    name: 'New sorted set posts:votes',
    timestamp: Date.UTC(2017, 1, 27),
    method(callback) {
        const { progress } = this;

        require('../../batch').processSortedSet('posts:pid', (pids, next) => {
            async.each(pids, (pid, next) => {
                db.getObjectFields(`post:${pid}`, ['upvotes', 'downvotes'], (error, postData) => {
                    if (error || !postData) {
                        return next(error);
                    }

                    progress.incr();
                    /* eslint-disable-next-line max-len */
                    const votes = Number.parseInt(postData.upvotes || 0, 10) - Number.parseInt(postData.downvotes || 0, 10);
                    db.sortedSetAdd('posts:votes', votes, pid, next);
                });
            }, next);
        }, {
            progress: this.progress,
        }, callback);
    },
};
