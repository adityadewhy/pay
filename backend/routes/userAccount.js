const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {UserAccount} = require("../db");
const {authMiddleware} = require("../middleware");

const z = require("zod");

const transferSchema = z.object({
	toAcc: String,
	amount: Number,
});

router.get("/balance", authMiddleware, async (req, res) => {
	console.log(`Route: req.userId = ${req.userId}`);
	// const userAccount = await UserAccount.findOne({
	// 	userId: req.userId,
	// });
	// console.log(userAccount);
	// res.status(200).json({
	// 	balance: userAccount.balance,
	// });
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
	const {success} = transferSchema.safeParse(req.body);
	if (!success) {
		return res.status(400).json({
			message: "invalid req.body by zod",
		});
	}
	const session = await mongoose.startSession();
	session.startTransaction();

	const {amount, toAcc} = req.body;

	const userAccount = await UserAccount
		.findOne({
			userId: req.userId,
		})
		.session(session);

	if (!userAccount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "invalid user",
		});
	}
	if (userAccount.balance < amount) {
		await session.abortTransaction();
		return res.status(400).json({
			message: "insufficient balance",
		});
	}

	const toAccount = await UserAccount
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

	await session.commitTransaction();
});

module.exports = router;
