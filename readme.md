## usage of functions

```js
const {connectDb,
       disconnectDb,
       create} = require("const mongo-node-client")

(async () => {

    const db = await connectDb('mongodb://localhost:27017');
    const dbo = db.db('myDb');
    const mongoClient = create(dbo,"myCollection");
    
    await mongoClient.createCollection();
    
    await mongoClient.insert({ user: 'adam', age: 999 });
    await mongoClient.insert({ user: 'eva', age: 777 });
    await mongoClient.find({ user: 'ff' });
    await mongoClient.findOne({ user: 'ff' });
    await mongoClient.update({ user: 'adam' }, { age: 88 });
    await mongoClient.updateMany({ user: 'adam' }, { age: 88 });
    await mongoClient.deleteItem({ user: 'adam' });
    await mongoClient.deleteItems({ user: 'adam' });

disconnectDb(db);
})()

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


