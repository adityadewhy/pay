const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {UserAccount} = require("../db");
const {authMiddleware} = require("../middleware");

router.get("/balance", authMiddleware, async (req, res) => {
	console.log(`Route: req.userId = ${req.userId}`);
	try {
        const userAccount = await UserAccount.findOne({ userId: req.userId });
        console.log(`User account: ${userAccount}`);

        if (!userAccount) {
            return res.status(404).json({ message: "User account not found" });
        }

        res.status(200).json({ balance: userAccount.balance });
    } catch (error) {
        console.error("Error fetching user account:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
	const session = await mongoose.startSession();
	console.log("session started");
	session.startTransaction();
	console.log("transaction started");

	const {amount, toAcc} = req.body;

	const userAccount = await UserAccount
		.findOne({
			userId: req.userId,
		})
		.session(session);
	console.log("acc found");

	if (!userAccount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "invalid user",
		});
	}
	console.log("acc not found");
	if (userAccount.balance < amount) {
		console.log("acc bal low");
		await session.abortTransaction();
		return res.status(400).json({
			message: "insufficient balance",
		});
	}

	console.log("going to find target acc");
	const toAccount = await UserAccount
		.findOne({
			userId: toAcc,
		})
		.session(session);
		console.log("target account checked");
	if (!toAccount) {
		console.log("target acc not found");
		await session.abortTransaction();
		return res.status(400).json({
			message: "cant find receiver",
		});
	}
	console.log("target acc found, updating sender balance next");

	await UserAccount
		.updateOne(
			{
				userId: req.userId,
			},
			{
				$inc: {balance: -amount},
			}
		)
		.session(session);
		console.log("updated sender balance, updating target bal now");

	await UserAccount
		.updateOne(
			{
				userId: toAcc,
			},
			{
				$inc: {balance: amount},
			}
		)
		.session(session);
		console.log("target bal updated");
		console.log("commiting transaction");

	await session.commitTransaction();
	res.status(200).json({ message: "Transfer successful" });
	console.log("trans commited");
});

module.exports = router;
