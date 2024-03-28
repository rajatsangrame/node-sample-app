
require('dotenv').config();
const { ObjectId } = require('mongodb');
const { getInstance, connect } = require('../db/mongo');

const balance1 = Number(process.argv[2]);
const balance2 = Number(process.argv[3]);


async function execute() {

    await connect();
    try {
        const promises = [
            getInstance().collection('stream').updateOne({ _id: new ObjectId('6601dd1417a1ec24350f5ba1') }, {
                $set: { 'balance': balance1 }
            }),
            getInstance().collection('stream').updateOne({ _id: new ObjectId('6601dd8017a1ec24350f5ba2') }, {
                $set: { 'balance': balance2 }
            }),
        ];
        await Promise.all(promises);
        console.log(`updated values ${balance1} ${balance2} `);

    } catch (err) {
        console.log(`Error in execution ${err} `);
    }

}

execute();

