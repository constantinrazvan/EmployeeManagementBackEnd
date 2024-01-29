import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const loginController = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ error: "Email address or password is invalid" });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Something went wrong" });
            }

            if (result) {
                const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
                res.status(200).json({
                    status: 'Success',
                    message: 'Login successful',
                    token,
                });
            } else {
                res.status(401).json({ error: "Invalid email or password." });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Failed',
            message: 'Something went wrong',
        });
    }
};

export const registerController = async (req: Request, res: Response) => {
    try {
        const exists = await User.findOne({ email: req.body.email });

        if (exists) {
            return res.status(400).json({
                status: "Failed",
                message: "Email already in use!",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ userId: savedUser._id }, 'secretKey', { expiresIn: '1h' });

        res.status(200).json({
            status: "Success!",
            message: "User created successfully!",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong!",
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        if (!users || users.length === 0) {
            res.status(400).json({
                status: "Fail",
                message: "No users!",
            });
        } else {
            res.status(200).json({
                status: "Success",
                message: "All users are here!",
                users,
            });
        }
    } catch (e) {
        console.error(e);
        res.status(400).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
};
