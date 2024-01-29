// utils
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// auth controllers
import { loginController, registerController } from "./controllers/authentcationController";

// employee services
import { getEmployees, getSingleEmployee, updateEmployee, deleteEmployee, insertEmployee } from "./controllers/employeeController";

const app = express();

app.use(express.json());
app.use(cors());

const port = 5500;

// mongodb connection

mongoose.connect("mongodb+srv://razvanpana20:razvanpana20@cluster0.l2fzixn.mongodb.net/")
    .then(() => {
        console.log("Successfully connected to Database!");
    })
    .catch(() => {
        console.log("Something went wrong connecting to Database!");
    });

// auth routes
app.post("/api/login", loginController);
app.post("/api/register", registerController);

// employee services routes
app.post("/api/createEmployee", insertEmployee);
app.get("/api/allEmployees", getEmployees);
app.patch("/api/updateEmployee/:employee_id", updateEmployee);
app.delete("/api/employees/:employee_id", deleteEmployee);
app.get("/api/employees/:employee_id", getSingleEmployee);

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});
