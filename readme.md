## usage of functions

```js

let res;
const collection = 'myCollection';

const db = await mongoClient.connectDb('mongodb://localhost:27017');
const dbo = db.db('myDb');
await mongoClient.createCollection(dbo, collection);

res = await mongoClient.insert(dbo, collection, { user: 'adam', age: 999 });
res = await mongoClient.insert(dbo, collection, { user: 'eva', age: 777 });

res = await mongoClient.find(dbo, collection, { user: 'ff' });
res = await mongoClient.findOne(dbo, collection, { user: 'ff' });

res = await mongoClient.update(dbo, collection, { user: 'adam' }, { age: 88 });
res = await mongoClient.updateMany(dbo, collection, { user: 'adam' }, { age: 88 });

res = await mongoClient.deleteItem(dbo, collection, { user: 'adam' });
res = await mongoClient.deleteItems(dbo, collection, { user: 'adam' });

mongoClient.disconnectDb(db);


```


## operation results

### update result 

```json
{
  "result": {
    "n": 2,
    "nModified": 1,
    "ok": 1
  },
  "connection": {
    "id": 0,
    "host": "localhost",
    "port": 27017
  },
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 2,
  "n": 2,
  "nModified": 1,
  "ok": 1
}
```

### delete result 

```json

{
  "result": {
    "n": 5,
    "ok": 1
  },
  "connection": {
    "id": 0,
    "host": "localhost",
    "port": 27017
  },
  "deletedCount": 5,
  "n": 5,
  "ok": 1
}


```
### insert result

```json
{
  "result": {
    "n": 1,
    "ok": 1
  },
  "connection": {
    "id": 0,
    "host": "localhost",
    "port": 27017
  },
  "ops": [
    {
      "user": "eva",
      "age": 777,
      "_id": "5f2337330a47628c6d18b08b"
    }
  ],
  "insertedCount": 1,
  "insertedId": "5f2337330a47628c6d18b08b",
  "n": 1,
  "ok": 1
}

```

### find result :  Array (if not fount [])

### findOne result :  Object  (if not found null)


