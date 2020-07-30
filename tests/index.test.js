/* eslint-disable no-undef,no-underscore-dangle */
const assert = require('assert');
// const fs = require('fs');
// const { v4 } = require('uuid');
// const { forEach } = require('lodash');
//
// const mongoClient = require('../mongo-client');

const {
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
} = require('../mongo-client-mock.js');

const wait = (delay) => new Promise((resolve) => {
  setTimeout(() => resolve(), delay);
});

// const connectDb = (url) => new Promise((resolve, reject) => {
//   if (fs.existsSync(`${url}.json`)) {
//     return resolve({ dbo: `${url}.json` });
//   }
//   fs.writeFile(`${url}.json`, '{}', (err) => {
//     if (err) {
//       return reject(err);
//     }
//     resolve({ dbo: `${url}.json` });
//   });
// });
//
// const disconnectDb = (db) => {
//   fs.unlinkSync(db.dbo);
// };
//
// const createCollection = (dbo, collection) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//
//     if ({}.hasOwnProperty.call(d, collection)) {
//       return resolve(d);
//     }
//     d[collection] = [];
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve(d);
//     });
//   });
// });
//
// const insert = (dbo, collection, item) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//
//     d[collection].push({ _id: v4(), ...item });
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve({
//         result: {
//           n: 1,
//           ok: 1,
//         },
//         connection: {
//           id: 0,
//           host: 'localhost',
//           port: 27017,
//         },
//         ops: [
//           { _id: v4(), ...item },
//         ],
//         insertedCount: 1,
//         insertedId: '5f2337330a47628c6d18b08b',
//         n: 1,
//         ok: 1,
//       });
//     });
//   });
// });
//
// const findOne = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//
//     return resolve(res.length > 0 ? res[0] : null);
//   });
// });
//
// const find = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//
//     return resolve(res);
//   });
// });
//
// const limit = (dbo, collection, lim, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//
//     return resolve(res.slice(0, lim));
//   });
// });
//
// const findAndSort = (dbo, collection, sort, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//
//     return resolve(res.sort(sort));
//   });
// });
//
// const findAndSortLimit = (dbo, collection, sort, lim, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//
//     return resolve(res.sort(sort).slice(0, lim));
//   });
// });
//
// const deleteItems = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//     const deleteIdList = res.map((i) => i._id);
//     const itemCount = deleteIdList.length;
//     d[collection] = d[collection].filter((i) => !deleteIdList.includes(i._id));
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve({
//         result: {
//           n: itemCount,
//           ok: 1,
//         },
//         connection: {
//           id: 0,
//           host: 'localhost',
//           port: 27017,
//         },
//         deletedCount: itemCount,
//         n: itemCount,
//         ok: 1,
//       });
//     });
//   });
// });
//
// const deleteItem = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//     const deleteIdList = res.map((i) => i._id);
//     d[collection] = d[collection].filter((i) => !deleteIdList.slice(0, 1).includes(i._id));
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve({
//         result: {
//           n: 1,
//           ok: 1,
//         },
//         connection: {
//           id: 0,
//           host: 'localhost',
//           port: 27017,
//         },
//         deletedCount: 1,
//         n: 1,
//         ok: 1,
//       });
//     });
//   });
// });
//
// const updateMany = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//     const deleteIdList = res.map((i) => i._id);
//     const itemCount = deleteIdList.length;
//     d[collection] = d[collection]
//       .map((i) => (deleteIdList.includes(i._id) ? { ...i, ...newProp } : i));
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve({
//         result: {
//           n: itemCount,
//           nModified: 1,
//           ok: 1,
//         },
//         connection: {
//           id: 0,
//           host: 'localhost',
//           port: 27017,
//         },
//         modifiedCount: 1,
//         upsertedId: null,
//         upsertedCount: 0,
//         matchedCount: itemCount,
//         n: itemCount,
//         nModified: 1,
//         ok: 1,
//       });
//     });
//   });
// });
//
// const update = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     let res = d[collection];
//     forEach(filter, (v, k) => {
//       res = res.filter((i) => i[k] === v);
//     });
//     const deleteIdList = res.map((i) => i._id);
//     d[collection] = d[collection]
//       .map((i) => (deleteIdList.slice(0, 1).includes(i._id) ? { ...i, ...newProp } : i));
//
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve({
//         result: {
//           n: 1,
//           nModified: 1,
//           ok: 1,
//         },
//         connection: {
//           id: 0,
//           host: 'localhost',
//           port: 27017,
//         },
//         modifiedCount: 1,
//         upsertedId: null,
//         upsertedCount: 0,
//         matchedCount: 1,
//         n: 1,
//         nModified: 1,
//         ok: 1,
//       });
//     });
//   });
// });
//
// const dropCollection = (dbo, collection) => new Promise((resolve, reject) => {
//   fs.readFile(dbo, 'utf8', (err, data) => {
//     if (err) {
//       return reject(err);
//     }
//
//     const d = JSON.parse(data);
//     if ({}.hasOwnProperty.call(d, collection)) {
//       delete d[collection];
//     }
//     return fs.writeFile(dbo, JSON.stringify(d), (_err) => {
//       if (_err) {
//         return reject(_err);
//       }
//       return resolve(d);
//     });
//   });
// });

describe('index', () => {
  const removeIds = (items) => items.map((i) => {
    const { _id, ...ret } = i;
    return ret;
  });
  const removeId = (item) => {
    const { _id, ...ret } = item;
    return ret;
  };

  const collectionName = 'myCollection';
  let db;
  beforeEach(async () => {
    db = await connectDb('database');
    await createCollection(db.dbo, collectionName);
    await insert(db.dbo, collectionName, { user: 123, pass: 12313 });
    await insert(db.dbo, collectionName, { user: 'adam', pass: 12 });
    await insert(db.dbo, collectionName, { user: 'adam', pass: 77 });
    await insert(db.dbo, collectionName, { user: 'adam', pass: 44 });
    await insert(db.dbo, collectionName, { user: 'eva', pass: 12313 });
    await insert(db.dbo, collectionName, { user: 'god', pass: 12313, creator: 1 });
  });

  afterEach(() => {
    disconnectDb(db);
  });

  it('should createCollection', async () => {
    const res = await createCollection(db.dbo, 'myCollection');
    // console.log(res);
  });

  it('should insert', async () => {
    let res = await insert(db.dbo, 'myCollection', { user: 'god', motto: 'sic mundus creatus est' });
    assert.deepStrictEqual(res.result, { n: 1, ok: 1 });

    res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 12 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
      { user: 'god', motto: 'sic mundus creatus est' },
    ]);
  });

  it('should find', async () => {
    const res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 12 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);
  });

  it('should findOne', async () => {
    let res = await findOne(db.dbo, collectionName, { user: 'adam', pass: 12313 });
    assert.deepStrictEqual(res, null);
    res = await findOne(db.dbo, collectionName, { user: 'adam', pass: 12 });
    assert.deepStrictEqual(removeId(res), { user: 'adam', pass: 12 });
  });

  it('should limit and sort', async () => {
    let res;
    res = await limit(db.dbo, collectionName, 1, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [{ user: 'adam', pass: 12 }]);

    res = await findAndSort(db.dbo, collectionName, (a, b) => a.pass - b.pass, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [
      { user: 'adam', pass: 12 },
      { user: 'adam', pass: 44 },
      { user: 'adam', pass: 77 },
    ]);

    res = await findAndSortLimit(db.dbo, collectionName, (a, b) => a.pass - b.pass, 2, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [{ user: 'adam', pass: 12 }, { user: 'adam', pass: 44 }]);
  });

  it('should delete', async () => {
    let res;
    res = await deleteItem(db.dbo, collectionName, { user: 'adam' });
    assert.deepStrictEqual(res, {
      result: { n: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      deletedCount: 1,
      n: 1,
      ok: 1,
    });

    res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    res = await deleteItems(db.dbo, collectionName, { user: 'adam' });
    assert.deepStrictEqual(res, {
      result: { n: 2, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      deletedCount: 2,
      n: 2,
      ok: 1,
    });

    res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    // console.log(removeIds(res));
  });

  it('should update', async () => {
    let res;
    res = await update(db.dbo, collectionName, { user: 'adam' }, { pass: 55555555 });
    assert.deepStrictEqual(res, {
      result: { n: 1, nModified: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1,
      n: 1,
      nModified: 1,
      ok: 1,
    });

    res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 55555555 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    res = await updateMany(db.dbo, collectionName, { user: 'adam' }, { pass: 55555555 });
    assert.deepStrictEqual(res, {
      result: { n: 3, nModified: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 3,
      n: 3,
      nModified: 1,
      ok: 1,
    });

    res = await find(db.dbo, collectionName);
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 55555555 },
      { user: 'adam', pass: 55555555 },
      { user: 'adam', pass: 55555555 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    // console.log(removeIds(res));
  });
});
