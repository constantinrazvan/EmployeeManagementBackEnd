import mongoose, { Schema } from "mongoose";

interface IEmployee {
    firstName: String,
    lastName: String,
    department: String,
}

const employeeSchema: Schema<IEmployee> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
