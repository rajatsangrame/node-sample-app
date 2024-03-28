
function needRebalance(budget, balance1, balance2) {

    if (balance1 <= 0 && balance2 <= 0) {
        console.log('Both streams have balance of 0% or less. Exiting program.');
        return false;
    } else if (balance1 / budget < 0.05 && balance2 / budget < 0.05) {
        console.log('Balancing is not required: Both have balance of less than 5%');
        return false;
    } else if (balance1 / budget < 0.05 || balance2 / budget < 0.05) {
        return true;
    }
    console.log('Balancing is not required: Both have balance of more than or equal to 5%');
    return false;
}


function rebalance(balance1, balance2) {
    const totalBudget = balance1 + balance2;
    const newBalance = totalBudget / 2;
    return newBalance;
}


module.exports = {
    needRebalance,
    rebalance
};