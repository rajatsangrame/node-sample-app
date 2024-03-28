const fs = require('fs');
const path = require('path');
const { needRebalance, rebalance } = require('../../src/worker/balancer-helper');


const data = fs.readFileSync(path.resolve(__dirname, '../mock/sample-input-1.json'));
const sampleInput = JSON.parse(data);

const budget = sampleInput.budget;
let balance1 = sampleInput.streams[0].balance; // 50000
let balance2 = sampleInput.streams[1].balance; // 50000


describe('Check if the rebalance is needed', () => {
    test('should return false if both balances are more than 5% of budget', () => {
        expect(needRebalance(budget, balance1, balance2)).toBe(false);
    });

    test('should return true if one of the balance is less than 5% of budget', () => {
        balance1 = 2000;
        balance2 = 6000;
        expect(needRebalance(budget, balance1, balance2)).toBe(true);
    });

    test('should return false if both balances are less than 5% of budget', () => {
        balance1 = 4000;
        balance2 = 4000;
        expect(needRebalance(budget, balance1, balance2)).toBe(false);
    });


    test('should return false if both balances are 0 or less', () => {
        balance1 = 0;
        balance2 = 0;
        expect(needRebalance(budget, balance1, balance2)).toBe(false);
    });

});


describe('Perform the rebalance', () => {

    test('should return the average of two balances', () => {
        expect(rebalance(6000, 2000)).toBe(4000);
    });

});




