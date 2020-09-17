const {
  connectDb,
  disconnectDb,
  createCollection,
  createIndex,
  deleteItem,
  deleteItems,
  dropCollection,
  find,
  findAndSort,
  findAndSortLimit,
  findOne,
  insert,
  limit,
  update,
  updateMany,
  aggregation,
  count,
  paginate,
} = require('./mongo-client.js');

module.exports = {
  connectDb,
  disconnectDb,
  create: (dbo, collection) => ({
    createCollection: () => createCollection(dbo, collection),
    dropCollection: () => dropCollection(dbo, collection),
    createIndex: (...args) => createIndex(dbo, collection, ...args),
    deleteItem: (...args) => deleteItem(dbo, collection, ...args),
    deleteItems: (...args) => deleteItems(dbo, collection, ...args),
    find: (...args) => find(dbo, collection, ...args),
    findAndSort: (...args) => findAndSort(dbo, collection, ...args),
    findAndSortLimit: (...args) => findAndSortLimit(dbo, collection, ...args),
    findOne: (...args) => findOne(dbo, collection, ...args),
    insert: (...args) => insert(dbo, collection, ...args),
    limit: (...args) => limit(dbo, collection, ...args),
    update: (...args) => update(dbo, collection, ...args),
    updateMany: (...args) => updateMany(dbo, collection, ...args),
    aggregation: (...args) => aggregation(dbo, collection, ...args),
    count: (...args) => count(dbo, collection, ...args),
    paginate: (...args) => paginate(dbo, collection, ...args),
  }),
};
