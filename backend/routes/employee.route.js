const express = require("express")
const { EmployeeModel } = require("../models/employee.model")
const employeeRouter = express.Router()

employeeRouter.get("/",async(req,res)=>{
    try{
        const employees = await EmployeeModel.find()
        res.status(201).json(employees)

    }catch(error){
        res.status(400).json(error)
    }
})

employeeRouter.post("/add",async(req,res)=>{
    const {first_name,last_name,email,department,salary} = req.body
    try{
        const newEmployee = new EmployeeModel({first_name,last_name,email,department,salary})
        await newEmployee.save()
        res.status(201).json({message:"Employee added successfully"})

    }catch(error){
        res.status(400).json(error)
    }
})

employeeRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, department, salary } = req.body;

    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            { first_name, last_name, email, department, salary },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee Updated" });
    } catch (error) {
        res.status(400).json(error);
    }
});


employeeRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try{
        await EmployeeModel.findByIdAndDelete(id)
        res.status(202).json({message:"Employee deleted"})

    }catch(error){
        res.status(400).json(error)
    }
})

module.exports={
    employeeRouter
}