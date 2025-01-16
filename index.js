import express from 'express'
import cors from 'cors'
// import jwt from 'jsonwebtoken'
// import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import { User } from './database/Users.js'
import useRoutes from "./routes/user.js"
// import { Reminder, User } from './database/db.js'
import nodemailer from 'nodemailer'
import schedule from 'node-schedule'
// import cron from "node-cron"
// import axios from 'axios'

dotenv.config();
const app = express();
app.use(cors());

// app.use(cors(
//   {
//     origin: ["https://under-one-sky-client-gourav-kumar-modis-projects.vercel.app"],
//     methods: ["POST", "GET", "PUT", "PATCH"],
//     credentials: true
//   }
// ));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
dbName: "skyBackend",
}).then(()=>console.log("DB connected"))
.catch((e)=>console.log(e))
// 
//register
app.use('/api', useRoutes)

// app.get("/protected", authenticateToken, (req, res) => {
//   res.status(200).json({message: "Welcome to the protected route!", user: req.user});
// })


app.get('/', (req, res) => {
    res.send('Backend server is working fine');
})

app.listen(PORT, () => console.log(`Server is running at port http://localhost:${PORT} 🚀`));
