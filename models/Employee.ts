import mongoose from "mongoose";

interface IEmployee {
    firstName: String, 
    lastName: String, 
    department: String,
}

const employeeSchema = new mongoose.Schema<IEmployee>({
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
})

employeeSchema.plugin(function (schema: any) {
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

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;