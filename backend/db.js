// backend/db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://adityadewhy:12345@paywalletcloudcluster.ravnj3x.mongodb.net/")

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
// Create a Schema for Users
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
});

const userAccountSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
		min: 0,
	},
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);
const UserAccount = mongoose.model("UserAccount", userAccountSchema);
module.exports = {
	User,
	UserAccount,
};
