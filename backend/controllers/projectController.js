import Project from '../models/Project.js';

const getProjects = async (req, res) => { 
  try { 
    const projects = await Project.find();
    return res.status(200).json({ success: true, projects });
  } catch (error) { 
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, error: "get project server error" });
  }
};

const addProject = async (req, res) => {
  try {
    const { project_name, description, deadline } = req.body; 
    const newProj = new Project({
      project_name,
      description,
      deadline
    });
    await newProj.save();
    return res.status(200).json({ success: true, project: newProj });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({ success: false, error: "add project server error" });
  }
};


// const getProject = async (req, res) => {
//   try {
//     const { id } = req.params; 
//     const project = await Project.findById({_id: id})
//     return res.status(200).json({ success: true, project });
//   } catch (error) { 
//     console.error("Error fetching projects:", error);
//     return res.status(500).json({ success: false, error: "get project server error" });
//   }
 
// };

const getProject = async (req, res) => {
  try {
    const { id } = req.params; 
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    
    return res.status(200).json({ success: true, project });
  } catch (error) { 
    console.error("Error fetching project:", error);
    return res.status(500).json({ success: false, error: "Get project server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params; 
    const { project_name, description, deadline } = req.body;
    const updateProject = await Project.findByIdAndUpdate({_id: id}, {
      project_name,
      description,
      deadline
    })

    return res.status(200).json({ success: true, updateProject });
  } catch (error) { 
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, error: "Edit project server error" });
  }
 
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; 
    const deleteProject = await Project.findByIdAndDelete({_id: id})

    return res.status(200).json({ success: true, deleteProject });
  } catch (error) { 
    console.error("Error fetching projects:", error);
    return res.status(500).json({ success: false, error: "delete project server error" });
  }
 
};





export { addProject, getProjects, getProject, updateProject, deleteProject};
