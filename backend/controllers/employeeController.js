import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'; 
import Project from "../models/Project.js"

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      designation,
      project,
      password,
      role
    } = req.body

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: "user already registered in employee" });
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
    })
    const savedUser = await newUser.save()

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      designation,
      project,
    })
    await newEmployee.save()
    return res.status(200).json({ success: true, message: "employee created" });

  } catch (error) {
    console.error("Error adding employee:", error);
    return res.status(500).json({ success: false, error: "Server error in adding employee" });
  }
}

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId', { password: 0 }).populate('project');
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ success: false, error: "get employees server error" });
  }
}


const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid Employee ID" });
    }
    let employee;
      employee = await Employee.findById(id)
      .populate('userId', { password: 0 })
      .populate('project');
    
      if(!employee) {
       employee = await Employee.findOne({userId: id})
      .populate('userId', { password: 0 })
      .populate('project');
    }

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ success: false, error: "Server error while fetching employee" });
  }
};



const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      employeeId,
      dob,
      designation,
      project,
      role,
      deadline
    } = req.body

    // Find the employee
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the associated user
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user
    await User.findByIdAndUpdate(employee.userId, { name, role });

    // Update the employee
    await Employee.findByIdAndUpdate(id, { employeeId, dob, designation, project, deadline });

    const updatedEmployee = await Employee.findById(id).populate('userId', {password: 0}).populate('project')

    return res.status(200).json({ success: true, message: "Employee updated successfully", employee: updatedEmployee });

  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ success: false, error: "Server error while updating employee" });
  }
}



const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid employee ID" });
      }

      // Find the employee by ID
      const employee = await Employee.findById(id);

      if (!employee) {
          return res.status(404).json({ success: false, error: "Employee not found" });
      }

      // Delete the associated User (if you want to delete the user account as well)
      await User.findByIdAndDelete(employee.userId); // Delete the user

      // Delete the employee
      await Employee.findByIdAndDelete(id);

      return res.status(200).json({ success: true, message: "Employee deleted successfully" });

  } catch (error) {
      console.error("Error deleting employee:", error);
      return res.status(500).json({ success: false, error: "Server error while deleting employee" });
  }
};

export { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee };