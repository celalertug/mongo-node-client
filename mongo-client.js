const { MongoClient } = require('mongodb');

const connectDb = (url) => new Promise((resolve, reject) => {
  MongoClient.connect(url, (err, _db) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(_db);
  });
});

const disconnectDb = (db) => {
  db.close();
};

const createDbo = (db, tableName) => db.db(tableName);

const createCollection = (dbo, collection) => new Promise((resolve, reject) => {
  dbo.createCollection(collection, (err, res) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(res);
  });
});

const insert = (dbo, collection, item) => new Promise((resolve, reject) => {
  dbo.collection(collection).insertOne(item, (err, res) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(res);
  });
});

const findOne = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  dbo.collection(collection).findOne(filter, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});

const find = (dbo, collection, filter = {}) => new Promise((resolve, reject) => {
  dbo
    .collection(collection)
    .find(filter)
    .toArray((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
});

const limit = (dbo, collection, lim, filter = {}) => new Promise((resolve, reject) => {
  dbo
    .collection(collection)
    .find(filter)
    .limit(lim)
    .toArray((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
});

const findAndSort = (dbo, collection, sort, filter = {}) => new Promise((resolve, reject) => {
  dbo
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
});

const findAndSortLimit = (dbo,
  collection, sort, lim, filter = {}) => new Promise((resolve, reject) => {
  dbo
    .collection(collection)
    .find(filter)
    .sort(sort)
    .limit(lim)
    .toArray((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
});

const dropCollection = (dbo, collection) => new Promise((resolve, reject) => {
  dbo.collection(collection).drop((err, delOK) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(delOK);
  });
});

const deleteItem = (dbo, collection, filter = {}) => new Promise((resolve, reject) => dbo.collection(collection).deleteOne(filter, (err, obj) => {
  if (err) {
    reject(err);
    return;
  }
  resolve(obj);
}));

const deleteItems = (dbo, collection, filter = {}) => new Promise((resolve, reject) => dbo.collection(collection).deleteMany(filter, (err, obj) => {
  if (err) {
    reject(err);
    return;
  }
  resolve(obj);
}));

const update = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
  const newvalues = { $set: newProp };
  dbo.collection(collection).updateOne(filter, newvalues, (err, res) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(res);
  });
});

const updateMany = (dbo, collection, filter = {}, newProp = {}) => new Promise((resolve, reject) => {
  const newvalues = { $set: newProp };
  dbo.collection(collection).updateMany(filter, newvalues, (err, res) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(res);
  });
});

module.exports = {
  connectDb,
  disconnectDb,
  createDbo,
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
};
