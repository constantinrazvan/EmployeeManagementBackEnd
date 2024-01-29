import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { loginController, registerController } from "./controllers/authentcationController";
import { getEmployees, getSingleEmployee, updateEmployee, deleteEmployee, insertEmployee } from "./controllers/employeeController";
import authenticateToken from "./middleware/authenticateToken";

const app = express();

app.use(express.json());
app.use(cors());

const port = 5500;

mongoose.connect("mongodb+srv://razvanpana20:razvanpana20@cluster0.l2fzixn.mongodb.net/")
    .then(() => {
        console.log("Successfully connected to Database!");
    })
    .catch(() => {
        console.log("Something went wrong connecting to Database!");
    });

app.post("/api/login", loginController);
app.post("/api/register", registerController);

app.post("/api/createEmployee", authenticateToken, insertEmployee);
app.get("/api/allEmployees", authenticateToken, getEmployees);
app.patch("/api/updateEmployee/:employee_id", authenticateToken, updateEmployee);
app.delete("/api/employees/:employee_id", authenticateToken, deleteEmployee);
app.get("/api/employees/:employee_id", authenticateToken, getSingleEmployee);

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});
