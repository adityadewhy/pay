const express = require("express");
const userRouter = require("./user");
const userAccountRouter = require("./userAccount");

const router = express.Router();

router.use("/user", userRouter);
router.use("/userAccount", userAccountRouter);

module.exports = router;
