const cron = require('node-cron');

function balance() {
    console.log('Cron job executed at:', new Date().toLocaleString());
    const execute = require('./balancer');
    execute();
}

cron.schedule('*/10 * * * * *', () => {
    balance();
});