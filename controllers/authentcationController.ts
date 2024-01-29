import express, { Request, Response } from 'express';
import User from '../models/User';

export const loginController = (req: Request, res: Response) => {
    try {
        // Your login logic goes here
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong",
        });
    }
};

export const registerController = async (req: Request, res: Response) => {
    try {
        const exists = await User.findOne({ email: req.body.email });

        if (exists) {
            res.status(400).json({
                status: "Failed",
                message: "Email already in use!",
            });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
            });

            const saved = await newUser.save();
            console.log(saved);

            res.status(200).json({
                status: "Success!",
                message: "User created successfully!",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!",
        });
    }
};