import User from '../models/User.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { trusted } from 'mongoose';


const login = async (req, res) => {
  try { 
    const { email, password } = req.body; 
    console.log("Login Request Received: ", email, password);

    const user = await User.findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } });
    console.log("User Found in DB: ", user);

    if (!user){
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match: ", isMatch);

    if (!isMatch){
      return res.status(400).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, 
    process.env.JWT_KEY, { expiresIn: "10d" });

    res.status(200).json({ 
      success: true, 
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });

  } catch(error) {
    console.error("Login Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}
//signup
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save User to Database
    await newUser.save();

    // Generate Token
    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_KEY, { expiresIn: "10d" });

    res.status(201).json({ success: true, token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });

  } catch (error) {
    console.error("Signup Error: ", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



 const verify = (req, res) => {
  return res.status(200).json({success: true, user: req.user })
 }
 export {login, verify,signup}