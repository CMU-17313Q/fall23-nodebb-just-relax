'use strict';

const user = require('../user');
const flags = require('../flags');

const flagsApi = module.exports;

flagsApi.create = async (caller, data) => {
    const required = ['type', 'id', 'reason'];
    if (!required.every(prop => Boolean(data[prop]))) {
        throw new Error('[[error:invalid-data]]');
    }

    const { type, id, reason } = data;

    await flags.validate({
        uid: caller.uid,
        type,
        id,
    });

    const flagObject = await flags.create(type, id, caller.uid, reason);
    flags.notify(flagObject, caller.uid);

    return flagObject;
};

flagsApi.update = async (caller, data) => {
    const allowed = await user.isPrivileged(caller.uid);
    if (!allowed) {
        throw new Error('[[error:no-privileges]]');
    }

    const { flagId } = data;
    delete data.flagId;

    await flags.update(flagId, caller.uid, data);
    return await flags.getHistory(flagId);
};

flagsApi.appendNote = async (caller, data) => {
    const allowed = await user.isPrivileged(caller.uid);
    if (!allowed) {
        throw new Error('[[error:no-privileges]]');
    }

    if (data.datetime && data.flagId) {
        try {
            const note = await flags.getNote(data.flagId, data.datetime);
            if (note.uid !== caller.uid) {
                throw new Error('[[error:no-privileges]]');
            }
        } catch (error) {
            // Okay if not does not exist in database
            if (error.message !== '[[error:invalid-data]]') {
                throw error;
            }
        }
    }

    await flags.appendNote(data.flagId, caller.uid, data.note, data.datetime);
    const [notes, history] = await Promise.all([
        flags.getNotes(data.flagId),
        flags.getHistory(data.flagId),
    ]);
    return { notes, history };
};

flagsApi.deleteNote = async (caller, data) => {
    const note = await flags.getNote(data.flagId, data.datetime);
    if (note.uid !== caller.uid) {
        throw new Error('[[error:no-privileges]]');
    }

    await flags.deleteNote(data.flagId, data.datetime);
    await flags.appendHistory(data.flagId, caller.uid, {
        notes: '[[flags:note-deleted]]',
        datetime: Date.now(),
    });

    const [notes, history] = await Promise.all([
        flags.getNotes(data.flagId),
        flags.getHistory(data.flagId),
    ]);
    return { notes, history };
};
