

const db = require('../../database');

module.exports = {
    name: 'Disable nodebb-plugin-soundpack-default',
    timestamp: Date.UTC(2020, 8, 6),
    async method() {
        await db.sortedSetRemove('plugins:active', 'nodebb-plugin-soundpack-default');
    },
};
