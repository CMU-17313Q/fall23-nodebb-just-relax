/* eslint-disable no-await-in-loop */

const db = require('../../database');
const batch = require('../../batch');

module.exports = {
    name: 'Fix category topic zsets',
    timestamp: Date.UTC(2018, 9, 11),
    async method() {
        const { progress } = this;

        const topics = require('../../topics');
        await batch.processSortedSet('topics:tid', async (tids) => {
            for (const tid of tids) {
                progress.incr();
                const topicData = await db.getObjectFields(`topic:${tid}`, ['cid', 'pinned', 'postcount']);
                if (Number.parseInt(topicData.pinned, 10) !== 1) {
                    topicData.postcount = Number.parseInt(topicData.postcount, 10) || 0;
                    await db.sortedSetAdd(`cid:${topicData.cid}:tids:posts`, topicData.postcount, tid);
                }

                await topics.updateLastPostTimeFromLastPid(tid);
            }
        }, {
            progress,
        });
    },
};
