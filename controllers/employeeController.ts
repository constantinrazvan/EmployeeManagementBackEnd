import express, { Request, Response } from 'express';
import Employee from '../models/Employee';

export const insertEmployee = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, department } = req.body;

        if (!firstName || !lastName || !department) {
            throw new Error("All fields must be filled!");
        } else {
            const newEmployee = new Employee({
                firstName: firstName,
                lastName: lastName,
                department: department,
            });

            const saved = await newEmployee.save();
            console.log(saved);

            res.status(200).json({
                status: "Success",
                message: "Employee inserted successfully!",
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

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find({});

        res.status(200).json({
            status: "Success",
            message: "All employees have been found!",
            data: employees,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!",
        });
    }
};

export const getSingleEmployee = async (req: Request, res: Response) => {
    try {
        const employee_id = req.params.employee_id;

        const employee = await Employee.findById(employee_id);

        if (!employee) {
            throw new Error("Employee not found!");
        }

        res.status(200).json({
            status: "Success",
            message: "Employee found!",
            data: employee,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!",
        });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee_id = req.params.employee_id;
        const { firstName, lastName, department } = req.body;

        if (!employee_id) {
            throw new Error("Employee id is required!");
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employee_id,
            {
                firstName: firstName,
                lastName: lastName,
                department: department,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedEmployee) {
            throw new Error("Employee not found!");
        }

        console.log("Employee updated successfully:", updatedEmployee);

        res.status(200).json({
            status: "Success",
            message: "Employee updated successfully!",
            data: updatedEmployee,
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(400).json({
            status: "Failed",
            message: `${error}` || "Something went wrong!",
        });
    }
};


export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee_id = req.params.employee_id;

        const deletedEmployee = await Employee.findByIdAndDelete(employee_id);

        if (!deletedEmployee) {
            throw new Error("Employee not found!");
        }

        res.status(200).json({
            status: "Success",
            message: "Employee deleted successfully!",
            data: deletedEmployee,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong!",
        });
    }
};