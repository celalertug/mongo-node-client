/* eslint-disable no-undef,no-underscore-dangle */
const assert = require('assert');

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
