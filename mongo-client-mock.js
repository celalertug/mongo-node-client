const fs = require('fs');
const { v4 } = require('uuid');
const { forEach } = require('lodash');

const connectDb = (url) => new Promise((resolve, reject) => {
  if (fs.existsSync(`${url}.json`)) {
    return resolve({ dbo: `${url}.json` });
  }
  fs.writeFile(`${url}.json`, '{}', (err) => {
    if (err) {
      return reject(err);
    }
    resolve({ dbo: `${url}.json` });
  });
});

const disconnectDb = (db) => {
  fs.unlinkSync(db.dbo);
};

const createCollection = (dbo, collection) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);

    if ({}.hasOwnProperty.call(d, collection)) {
      return resolve(d);
    }
    d[collection] = [];

    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve(d);
    });
  });
});

const insert = (dbo, collection, item) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);

    d[collection].push({ _id: v4(), ...item });

    return fs.writeFile(dbo, JSON.stringify(d, null, 2), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve({
        result: {
          n: 1,
          ok: 1,
        },
        connection: {
          id: 0,
          host: 'localhost',
          port: 27017,
        },
        ops: [
          { _id: v4(), ...item },
        ],
        insertedCount: 1,
        insertedId: '5f2337330a47628c6d18b08b',
        n: 1,
        ok: 1,
      });
    });
  });
});

const findOne = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });

    return resolve(res.length > 0 ? res[0] : null);
  });
});

const find = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });

    return resolve(res);
  });
});

const limit = (dbo, collection, lim, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });

    return resolve(res.slice(0, lim));
  });
});

const findAndSort = (dbo, collection, sort, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });

    return resolve(res.sort(sort));
  });
});

const findAndSortLimit = (dbo, collection, sort, lim, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });

    return resolve(res.sort(sort).slice(0, lim));
  });
});

const deleteItems = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });
    const deleteIdList = res.map((i) => i._id);
    const itemCount = deleteIdList.length;
    d[collection] = d[collection].filter((i) => !deleteIdList.includes(i._id));

    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve({
        result: {
          n: itemCount,
          ok: 1,
        },
        connection: {
          id: 0,
          host: 'localhost',
          port: 27017,
        },
        deletedCount: itemCount,
        n: itemCount,
        ok: 1,
      });
    });
  });
});

const deleteItem = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });
    const deleteIdList = res.map((i) => i._id);
    d[collection] = d[collection].filter((i) => !deleteIdList.slice(0, 1).includes(i._id));

    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve({
        result: {
          n: 1,
          ok: 1,
        },
        connection: {
          id: 0,
          host: 'localhost',
          port: 27017,
        },
        deletedCount: 1,
        n: 1,
        ok: 1,
      });
    });
  });
});

const updateMany = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });
    const deleteIdList = res.map((i) => i._id);
    const itemCount = deleteIdList.length;
    d[collection] = d[collection]
      .map((i) => (deleteIdList.includes(i._id) ? { ...i, ...newProp } : i));

    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve({
        result: {
          n: itemCount,
          nModified: 1,
          ok: 1,
        },
        connection: {
          id: 0,
          host: 'localhost',
          port: 27017,
        },
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: itemCount,
        n: itemCount,
        nModified: 1,
        ok: 1,
      });
    });
  });
});

const update = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    let res = d[collection];
    forEach(filter, (v, k) => {
      res = res.filter((i) => i[k] === v);
    });
    const deleteIdList = res.map((i) => i._id);
    d[collection] = d[collection]
      .map((i) => (deleteIdList.slice(0, 1).includes(i._id) ? { ...i, ...newProp } : i));

    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve({
        result: {
          n: 1,
          nModified: 1,
          ok: 1,
        },
        connection: {
          id: 0,
          host: 'localhost',
          port: 27017,
        },
        modifiedCount: 1,
        upsertedId: null,
        upsertedCount: 0,
        matchedCount: 1,
        n: 1,
        nModified: 1,
        ok: 1,
      });
    });
  });
});

const dropCollection = (dbo, collection) => new Promise((resolve, reject) => {
  fs.readFile(dbo, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const d = JSON.parse(data);
    if ({}.hasOwnProperty.call(d, collection)) {
      delete d[collection];
    }
    return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
      if (_err) {
        return reject(_err);
      }
      return resolve(d);
    });
  });
});

module.exports = {
  connectDb,
  disconnectDb,
  createCollection,
  insert,
  findOne,
  find,
  limit,
  findAndSort,
  findAndSortLimit,
  deleteItem,
  deleteItems,
  update,
  updateMany,
  dropCollection,
};
