'use strict';

module.exports = function (options) {
    const LRU = require('lru-cache');
    const pubsub = require('../pubsub');

    // Lru-cache@7 deprecations
    const winston = require('winston');
    const chalk = require('chalk');

    // Sometimes we kept passing in `length` with no corresponding `maxSize`.
    // This is now enforced in v7; drop superfluous property
    if (options.hasOwnProperty('length') && !options.hasOwnProperty('maxSize')) {
        winston.warn(`[cache/init(${options.name})] ${chalk.white.bgRed.bold('DEPRECATION')} ${chalk.yellow('length')} was passed in without a corresponding ${chalk.yellow('maxSize')}. Both are now required as of lru-cache@7.0.0.`);
        delete options.length;
    }

    const deprecations = new Map([
        ['stale', 'allowStale'],
        ['maxAge', 'ttl'],
        ['length', 'sizeCalculation'],
    ]);
    for (const [oldProp, newProp] of deprecations.entries()) {
        if (options.hasOwnProperty(oldProp) && !options.hasOwnProperty(newProp)) {
            winston.warn(`[cache/init(${options.name})] ${chalk.white.bgRed.bold('DEPRECATION')} The option ${chalk.yellow(oldProp)} has been deprecated as of lru-cache@7.0.0. Please change this to ${chalk.yellow(newProp)} instead.`);
            options[newProp] = options[oldProp];
            delete options[oldProp];
        }
    }

    const lruCache = new LRU(options);

    const cache = {};
    cache.name = options.name;
    cache.hits = 0;
    cache.misses = 0;
    cache.enabled = options.hasOwnProperty('enabled') ? options.enabled : true;
    const cacheSet = lruCache.set;

    // Expose properties while keeping backwards compatibility
    const propertyMap = new Map([
        ['length', 'calculatedSize'],
        ['calculatedSize', 'calculatedSize'],
        ['max', 'max'],
        ['maxSize', 'maxSize'],
        ['itemCount', 'size'],
        ['size', 'size'],
        ['ttl', 'ttl'],
    ]);
    for (const [cacheProp, lruProp] of propertyMap.entries()) {
        Object.defineProperty(cache, cacheProp, {
            get() {
                return lruCache[lruProp];
            },
            configurable: true,
            enumerable: true,
        });
    }

    cache.set = function (key, value, ttl) {
        if (!cache.enabled) {
            return;
        }

        const options = {};
        if (ttl) {
            options.ttl = ttl;
        }

        cacheSet.apply(lruCache, [key, value, options]);
    };

    cache.get = function (key) {
        if (!cache.enabled) {
            return undefined;
        }

        const data = lruCache.get(key);
        if (data === undefined) {
            cache.misses += 1;
        } else {
            cache.hits += 1;
        }

        return data;
    };

    cache.del = function (keys) {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }

        pubsub.publish(`${cache.name}:lruCache:del`, keys);
        for (const key of keys) {
            lruCache.delete(key);
        }
    };

    cache.delete = cache.del;

    cache.reset = function () {
        pubsub.publish(`${cache.name}:lruCache:reset`);
        localReset();
    };

    cache.clear = cache.reset;

    function localReset() {
        lruCache.clear();
        cache.hits = 0;
        cache.misses = 0;
    }

    pubsub.on(`${cache.name}:lruCache:reset`, () => {
        localReset();
    });

    pubsub.on(`${cache.name}:lruCache:del`, (keys) => {
        if (Array.isArray(keys)) {
            for (const key of keys) {
                lruCache.delete(key);
            }
        }
    });

    cache.getUnCachedKeys = function (keys, cachedData) {
        if (!cache.enabled) {
            return keys;
        }

        let data;
        let isCached;
        const unCachedKeys = keys.filter((key) => {
            data = cache.get(key);
            isCached = data !== undefined;
            if (isCached) {
                cachedData[key] = data;
            }

            return !isCached;
        });

        const hits = keys.length - unCachedKeys.length;
        const misses = keys.length - hits;
        cache.hits += hits;
        cache.misses += misses;
        return unCachedKeys;
    };

    cache.dump = function () {
        return lruCache.dump();
    };

    cache.peek = function (key) {
        return lruCache.peek(key);
    };

    return cache;
};
