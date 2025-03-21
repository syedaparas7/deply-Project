import express from 'express' 
import cors from 'cors' 
import authRouter from './routes/auth.js'
import projectRouter from './routes/project.js'
import employeeRouter from './routes/employee.js'
import userRoutes from './routes/userRoutes.js';


import connectToDatabase from './db/db.js'

connectToDatabase()


const app = express() 
app.use(cors({ origin: "https://deply-project.vercel.app/" })) 
app.use(express.json()) 
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/users', userRoutes);



app.get('/',(req,res)=>{
  res.send('hello/bakend')
})

app.get('/get',(req,res)=>{
  res.send('Hello-World-bakend')
})
app.listen(process.env.PORT ||5000, () => { 
  console.log(`Server is Running on port ${process.env.PORT}`)
})
