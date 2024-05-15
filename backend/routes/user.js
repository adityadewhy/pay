const express = require('express')
import { User } from '../db';
import {z} from Zod;
import JWT_SECRET from '../config';

const router = express.Router();

const signupSchema = z.object({
    firstName: z.string(),
    lastName:z.string();
    username: z.string().min(5, 'Username must be at least 5 characters'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
})

const siginSchema = z.object({
    username: z.string().min(5, "username doesnt meet min no of characters"),
    password: z.string().min(8, "password doesnt meet min no of characters")

})

router.post('/signup',async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const checkExistingUser = await User.findOne({
        username: body.username,
    })

    if(checkExistingUser){
        return res.status(411).json({
            msg: "username already exists",
        })
    }

    const user = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.status(200).json({
        message:"user created successfully",
        token: token,
    })

})

router.post('/signin', async(req,res)=>{
    const body = req.body;
    const {success} = signin.safeParse(body);
    if(!success){
        res.status(411).json({
            message:"incorrect inputs",
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password,
    })

    if(user){
        const token = jwt.sign({
            userId : user._id,
        }, JWT_SECRET)

        return res.status(200).json({
            message:"username and password match found",
            token: token,
        })
    }

    res.status(411).json({
        message:"Error while logging in",
    })

})

module.exports(router);