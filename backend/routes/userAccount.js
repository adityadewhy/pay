const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {userAccount} = require("../db");
const {authMiddleware} = require("../middleware");

const z = require("zod");

const transferSchema = z.object({
	toAcc: String,
	amount: Number,
});

router.get("/balance", authMiddleware, async (req, res) => {
	const acc = await userAccount.findOne({
		userId: req.userId,
	});
	console.log(acc);
	res.status(200).json({
		balance: acc.balance,
	});
});

router.post("/transfer", authMiddleware, async (req, res) => {
	const {success} = transferSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({
			message: "invalid req.body by zod",
		});
	}
	const session = await mongoose.startSession();
	session.startTransaction();

	const {amount, toAcc} = req.body;

	const account = await userAccount
		.findOne({
			userId: req.userId,
		})
		.session(session);

	if (!account) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "invalid user",
		});
	}
	if (account.balance < amount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "insufficient balance",
		});
	}

	const toAccount = await userAccount
		.findOne({
			userId: toAcc,
		})
		.session(session);

	if (!toAccount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "cant find receiver",
		});
	}

	await userAccount
		.updateOne(
			{
				userId: req.userId,
			},
			{
				$inc: {balance: -amount},
			}
		)
		.session(session);

	await userAccount
		.updateOne(
			{
				userId: toAcc,
			},
			{
				$inc: {balance: amount},
			}
		)
		.session(session);

	await session.commitTransaction();
});

module.exports = router;
