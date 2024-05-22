function genRandomBalance() {
    let balance = 0;
    balance = Math.random() * 1000;
    return balance;
}

module.exports = genRandomBalance;
