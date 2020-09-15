/* eslint-disable no-undef */

const { create, connectDb, disconnectDb } = require('../index');

describe('real test', () => {
  it('should join find', async () => {
    const db = await connectDb('mongodb://localhost:27017');
    const dbo = db.db('adminpanel');
    const mongoClient = create(dbo, 'transactions');

    const res = await mongoClient.aggregation({ amount: 100 }, {
      from: 'mobile-users',
      localField: 'ownerId',
      foreignField: 'id',
      as: 'mobileUser',
    }, 0, 1);

    console.log(JSON.stringify(res, null, 2));
    disconnectDb(db);
  });

  it('should count', async () => {
    const db = await connectDb('mongodb://localhost:27017');
    const dbo = db.db('adminpanel');
    const mongoClient = create(dbo, 'transactions');

    const res = await mongoClient.count();
    console.log(res);
  });

  it('should create index', async () => {
    const db = await connectDb('mongodb://localhost:27017');
    const dbo = db.db('adminpanel');
    const mongoClient = create(dbo, 'transactions');

    try {
      await mongoClient.createIndex({ status: 'text', bank: 'text' });
    } catch (err) {
      console.error('index error');
      console.error(err);
    }

    const res = await mongoClient.find({ $text: { $search: 'xxx' } });
    console.log(res);

    // disconnectDb(db);
  });
});
