
const { getInstance } = require('../db/mongo');
const { needRebalance, rebalance } = require('./balancer-helper');


async function checkAndRebalance(booking) {

    let stream1 = booking.streams[0];
    let stream2 = booking.streams[1];

    if (needRebalance(booking.budget, stream1.balance, stream2.balance)) {
        const newBalance = rebalance(stream1.balance, stream2.balance);
        console.log('New balances:', newBalance);

        await getInstance().collection('stream').updateMany(
            { _id: { $in: [stream1._id, stream2._id] } },
            { $set: { balance: newBalance } });
    }
}


async function execute() {

    const bookings = await getInstance().collection('booking').find({}).limit(10).toArray();

    const promises = bookings.map(async booking => {
        const streams = await getInstance().collection('stream').aggregate([
            { $match: { _id: { $in: booking.streams.map(id => id) } } }
        ]).toArray();
        booking.streams = streams;
    });

    await Promise.all(promises);
    bookings.forEach(async booking => {
        await checkAndRebalance(booking);
    });


}

module.exports = execute;
