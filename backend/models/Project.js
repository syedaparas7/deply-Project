 import mongoose from "mongoose";

 const projectSchema =  new mongoose.Schema({
  project_name: {type: String, required: true},
  description: {type: String},
  deadline: { type: Date, required: true },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}

 })

 const Project  = mongoose.model('Project', projectSchema)

 export default Project