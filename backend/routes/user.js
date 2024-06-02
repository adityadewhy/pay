const express = require("express");
const {User, UserAccount} = require ("../db");
const z = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");

const router = express.Router();

const signupSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	username: z.string().min(5, "Username must be at least 5 characters"),
	password: z.string().min(8, "Password must contain at least 8 characters"),
});

const siginSchema = z.object({
	username: z.string().min(5, "username doesnt meet min no of characters"),
	password: z.string().min(8, "password doesnt meet min no of characters"),
});

const updateSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	password: z.string().min(8, "Password must contain at least 8 characters"),
});

router.post("/signup", async (req, res) => {
	const body = req.body;
	const {success} = signupSchema.safeParse(body);
	if (!success) {
		return res.status(400).json({
			message: "Incorrect inputs",
		});
	}

	const checkExistingUser = await User.findOne({
		username: body.username,
	});

	if (checkExistingUser) {
		return res.status(411).json({
			msg: "username already exists",
		});
	}

	const user = await User.create({
		firstName: body.firstName,
		lastName: body.lastName,
		username: body.username,
		password: body.password,
	});
	const userId = user._id;

	await UserAccount.create({
		userId,
		balance: parseFloat((1 + Math.random() * 10000).toFixed(2)),
	})

	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET
	);

	res.status(200).json({
		message: "user created successfully",
		token: token,
	});
});

router.post("/signin", async (req, res) => {
	const body = req.body;
	const {success} = siginSchema.safeParse(body);
	if (!success) {
		res.status(411).json({
			message: "incorrect inputs",
		});
	}
	const user = await User.findOne({
		username: body.username,
		password: body.password,
	});

	if (user) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			JWT_SECRET
		);

		return res.status(200).json({
			message: "username and password match found",
			token: token,
		});
	}

	res.status(411).json({
		message: "Error while logging in",
	});
});

router.put("/", authMiddleware, async (req, res) => {
	const body = req.body;
	const {success} = updateSchema.safeParse(body);
	if (!success) {
		return res.status(411).json({
			message: "error updating user",
		});
	}

	await User.updateOne(req.body,{
		id: req.userId,
	});

	return res.status(200).json({
		message: "user updated successfully",
	});
});

router.get("/bulk", async (req, res) => {
	try {
		const filter = req.query.filter || "";
		const users = await User.find({
			$or: [
				{firstName: {$regex: filter, $options: "i"}},
				{lastName: {$regex: filter, $options: "i"}},
			],
		});

		res.json({
			users: users.map((user) => ({
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
			})),
		});
	} catch (error) {
		res.status(500).json({error: "An error occurred while fetching users."});
	}
});

module.exports=router;
