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
// import * as msal from '@azure/msal-node'
// import { ConfidentialClientApplication } from '@azure/msal-node';

dotenv.config();
const app = express();
app.use(cors(
  {
    origin: ["https://under-one-sky-client.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
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

// Step 1: Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: "gouravmodi1195@gmail.com", // Your email
    pass: "bweg dybp vykp eqth", // App password: bweg dybp vykp eqth
  },
});

// Step 2: Define the Email Options
const mailOptions = {
  from: '"Reminder Bot" <gouravmodi1195@gmail.com>',
  to: "hhhggg97340@gmail.com", // Receiver's email
  subject: "Reminder: Task Due!",
  text: "Hey! Just a reminder about your task. Don't forget to complete it!",
};

// Step 3: Schedule the Email
const reminderDate = new Date(2024, 11, 10, 13, 14, 10); // Example: Dec 10, 2024, 10:00 AM

schedule.scheduleJob(reminderDate, () => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
});

console.log(`Reminder set for: ${reminderDate}`);



app.get('/', (req, res) => {
    res.send('here is the server');
})

app.listen(PORT, () => console.log(`Server is running at port http://localhost:${PORT} 🚀`));
