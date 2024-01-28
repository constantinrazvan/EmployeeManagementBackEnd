//utils
import Express from 'express';
import cors from 'cors';

//auth controllers
import loginController from './controllers/authentcationController';
import registerController from './controllers/authentcationController';

//employee services
import createEmployee from './controllers/employeeController';
import readEmployee from './controllers/employeeController';
import getSingleEmployee from './controllers/employeeController';
import updateEmployee from './controllers/employeeController';
import deleteEmployee from './controllers/employeeController';
import mongoose from 'mongoose';

const app = Express();

app.use(Express.json());
app.use(cors());

const port = 5500;

//mongodb connection

mongoose.connect("")
    .then(() => {
        console.log("Succesfully connected to Database!");
    })
    .catch(() => { 
        console.log("Something went wrong connecting to Database!");
    })

//auth routes
app.post("/api/login", loginController);
app.post("/api/register", registerController);

//employee services routes
app.post("/api/createEmployee", createEmployee);
app.get("/api/allEmployees", readEmployee);
app.patch("/api/updateEmployee", updateEmployee);
app.delete("/api/employees/:employee_id", deleteEmployee);
app.get("/api/employees/:employee_id", getSingleEmployee);

app.listen(port, () => { 
    console.log(`App is listening to port: ${port}`);
})
