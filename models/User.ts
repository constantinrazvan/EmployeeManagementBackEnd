import mongoose, { Schema } from "mongoose";

interface IUser {
    email: String,
    password: String,
    role: String
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
