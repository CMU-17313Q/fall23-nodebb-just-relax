

const helpers = module.exports;

helpers.noop = function () {};

helpers.execBatch = async function (batch) {
    const results = await batch.exec();
    return results.map(([error, res]) => {
        if (error) {
            throw error;
        }

        return res;
    });
};

helpers.resultsToBool = function (results) {
    for (let i = 0; i < results.length; i += 1) {
        results[i] = results[i] === 1;
    }

    return results;
};

helpers.zsetToObjectArray = function (data) {
    const objects = Array.from({ length: data.length / 2 });
    for (let i = 0, k = 0; i < objects.length; i += 1, k += 2) {
        objects[i] = { value: data[k], score: Number.parseFloat(data[k + 1]) };
    }

    return objects;
};
