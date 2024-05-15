const express = require('express')
import { User } from '../db';
import {z} from Zod;

const router = express.Router();

const signUpSchema = z.object({
    firstName: z.string(),
    lastName:z.string();
    username: z.string().min(5, 'Username must be at least 5 characters'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
})

router.post('/signup',async(req,res)=>{
    const body = req.body;
    const {success} = signUpSchema.safeParse(req.body);
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

})

router.post('/sigin',(req,res)=>{

})

module.exports(router);