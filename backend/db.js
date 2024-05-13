const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/paytm');
}

const usersSchema = new mongoose.Schema({
    name: String,
    balance: Number
})

const users = mongoose.model('users',usersSchema)

const user = new users({
    name: Aditya,
    balance: 2000
})