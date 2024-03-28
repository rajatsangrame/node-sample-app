const { MongoClient } = require('mongodb');

let db;

async function connect() {

    try {
        const client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.error('Succesfuly connted to DB');
    } catch (err) {
        console.error(`Unable to connect to database${err}`);
    }

}

function getInstance() {
    return db;
}


module.exports = {
    getInstance,
    connect
};
