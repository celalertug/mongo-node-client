/* eslint-disable no-undef,no-underscore-dangle */
const assert = require('assert');

const {
  connectDb,
  disconnectDb,
  create,
} = require('../mock-service');

describe('mock', () => {
  const removeIds = (items) => items.map((i) => {
    const { _id, ...ret } = i;
    return ret;
  });
  const removeId = (item) => {
    const { _id, ...ret } = item;
    return ret;
  };

  let createCollection;
  let deleteItem;
  let deleteItems;
  let dropCollection;
  let find;
  let findAndSort;
  let findAndSortLimit;
  let findOne;
  let insert;
  let limit;
  let update;
  let updateMany;

  const collectionName = 'myCollection';
  let db;
  beforeEach(async () => {
    db = await connectDb('database');
    const service = create(db.dbo, collectionName);

    createCollection = service.createCollection;
    deleteItem = service.deleteItem;
    deleteItems = service.deleteItems;
    dropCollection = service.dropCollection;
    find = service.find;
    findAndSort = service.findAndSort;
    findAndSortLimit = service.findAndSortLimit;
    findOne = service.findOne;
    insert = service.insert;
    limit = service.limit;
    update = service.update;
    updateMany = service.updateMany;

    await createCollection();
    await insert({ user: 123, pass: 12313 });
    await insert({ user: 'adam', pass: 12 });
    await insert({ user: 'adam', pass: 77 });
    await insert({ user: 'adam', pass: 44 });
    await insert({ user: 'eva', pass: 12313 });
    await insert({ user: 'god', pass: 12313, creator: 1 });
  });

  afterEach(() => {
    disconnectDb(db);
  });

  it('should createCollection', async () => {
    const res = await createCollection(db.dbo, 'myCollection');
    // console.log(res);
  });

  it('should insert', async () => {
    let res = await insert({ user: 'god', motto: 'sic mundus creatus est' });
    assert.deepStrictEqual(res.result, { n: 1, ok: 1 });

    res = await find();
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
    const res = await find();
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
    let res = await findOne({ user: 'adam', pass: 12313 });
    assert.deepStrictEqual(res, null);
    res = await findOne({ user: 'adam', pass: 12 });
    assert.deepStrictEqual(removeId(res), { user: 'adam', pass: 12 });
  });

  it('should limit and sort', async () => {
    let res;
    res = await limit(1, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [{ user: 'adam', pass: 12 }]);

    res = await findAndSort((a, b) => a.pass - b.pass, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [
      { user: 'adam', pass: 12 },
      { user: 'adam', pass: 44 },
      { user: 'adam', pass: 77 },
    ]);

    res = await findAndSortLimit((a, b) => a.pass - b.pass, 2, { user: 'adam' });
    assert.deepStrictEqual(removeIds(res), [{ user: 'adam', pass: 12 }, { user: 'adam', pass: 44 }]);
  });

  it('should delete', async () => {
    let res;
    res = await deleteItem({ user: 'adam' });
    assert.deepStrictEqual(res, {
      result: { n: 1, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      deletedCount: 1,
      n: 1,
      ok: 1,
    });

    res = await find();
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    res = await deleteItems({ user: 'adam' });
    assert.deepStrictEqual(res, {
      result: { n: 2, ok: 1 },
      connection: { id: 0, host: 'localhost', port: 27017 },
      deletedCount: 2,
      n: 2,
      ok: 1,
    });

    res = await find();
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    // console.log(removeIds(res));
  });

  it('should update', async () => {
    let res;
    res = await update({ user: 'adam' }, { pass: 55555555 });
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

    res = await find();
    assert.deepStrictEqual(removeIds(res), [
      { user: 123, pass: 12313 },
      { user: 'adam', pass: 55555555 },
      { user: 'adam', pass: 77 },
      { user: 'adam', pass: 44 },
      { user: 'eva', pass: 12313 },
      { user: 'god', pass: 12313, creator: 1 },
    ]);

    res = await updateMany({ user: 'adam' }, { pass: 55555555 });
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

    res = await find();
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
