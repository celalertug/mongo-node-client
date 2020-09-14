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
});
