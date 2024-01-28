import Express, {Request, Response} from 'express';
import Employee from '../models/Employee';

const createEmployee = (req: Request, res: Response) => { 
    try {

        const { firstName, lastName, department } = req.body; 

        if(!firstName || !lastName || !department) {
            throw "All fields must be filled!";
        } else {
            const newEmployee = new Employee({
                firstName: firstName,
                lastName: lastName,
                department: department
            })
    
            const saved = newEmployee.save(); 
            console.log(saved);
        }
    } catch {
        res.status(400).json({
            status: "Failed", 
            message: "Something went wrong!"
        });
    }
}

const readEmployee = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find({});

        res.status(200).json({
            status: "Success", 
            message: "All employess has been found!"
        })
    } catch {
        res.status(400).json({
            status: "Failed", 
            message: "Something went wrong!"
        });
    }
}

const getSingleEmployee = async(req: Request, res: Response) => {
    try {
        const employee_id = req.params.employee_id;

        await Employee.find({ id: employee_id });

        res.status(200).json({
            status: "Success", 
            message: "All employess has been found!"
        })
    } catch {
        res.status(400).json({
            status: "Failed", 
            message: "Something went wrong!"
        });
    }
}

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const {employee_id, firstName, lastName, department} = req.body;

        if(!employee_id) {
            throw "Employee id is required!"
        }

        await Employee.updateOne({
            _id: employee_id
        }, {
            firstName: firstName, 
            lastName: lastName, 
            department: department
        }, {
            runValidators: true,
        })

    } catch {
        res.status(400).json({
            status: "Failed", 
            message: "Something went wrong!"
        });
    }
}

const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee_id = req.params.employee_id;
        console.log(req.params);

        await Employee.deleteOne({
            _id: employee_id,
        });

        res.status(200).json({
            status: "Success", 
            message: "Employee deleted succesfully!"
        })
    } catch {
        res.status(400).json({
            status: "Failed", 
            message: "Something went wrong!"
        });
    }
}

export default {createEmployee, readEmployee, updateEmployee, deleteEmployee};