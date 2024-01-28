import Express, {Request, Response} from 'express';
import User from '../models/User';

const loginController = (req: Request, res: Response) => { 
    try {
    } catch {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

const registerController = (req: Request, res: Response) => {
    try {
        const exists = User.find({ email: req.body.email });

        if(exists[0]) {
            return "Email already in use!";
        } else {
            const newUser = new User({
                email: req.body.email, 
                password: req.body.password 
            })

            const saved = newUser.save();
            console.log(saved);

            res.status(200).json({
                status: "Success!", 
                message: "User created succesfully!"
            })
        }
    } catch {
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!"
        })
    }
}

export default {loginController, registerController};