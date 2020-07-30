const {
  connectDb,
  disconnectDb,
  createCollection,
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
} = require('./mongo-client-mock');

module.exports = {
  connectDb,
  disconnectDb,
  create: (dbo, collection) => ({
    createCollection: () => createCollection(dbo, collection),
    dropCollection: () => dropCollection(dbo, collection),
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
  }),
};
