require('dotenv').config();

const { connect } = require('./db/mongo');

async function start() {
    try {
        await connect();
        require('./worker/balancer-cron');
    } catch (err) {
        console.error(err);
    }
}

start();