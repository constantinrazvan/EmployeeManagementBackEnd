import mongoose from "mongoose";

interface IUser {
    email: String, 
    password: String, 
    role: String
}

const userSchema = new mongoose.Schema<IUser>({
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
})

userSchema.plugin(function (schema: any) {
    schema.options = schema.options || {};
    schema.options._id = false;
    schema.add({
        _id: {
            type: Number,
            unique: true,
            required: true,
            default: 1
        }
    });
});

const User = mongoose.model("User", userSchema);

export default User;