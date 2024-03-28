# sample-node-app

## Steps for the installatation

1. Clone this repo.
2. Install [mongodb](https://www.mongodb.com/docs/manual/installation/) and start locally
3. Edit .env file
```
MONGO_URL = mongodb://localhost:27017
DB_NAME = valuelabs
```
4. Use `npm start` to start the rebalancing cron. This will fetch the balance from the db and perform rebalancing every 10* sec. You can check the console logs for the result.
5. You can also use `modify-balance.js` in new terimal window to update the db values for testing purpose. For eg,
```
node src/util/modify-balance.js 6000 2000
```

## Steps to run the test cases.

```
npm i
npm run test
```
