
// // Step 1: Configure Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail", // Use your email provider
//     auth: {
//       user: "gouravmodi1195@gmail.com", // Your email
//       pass: "bweg dybp vykp eqth", // App password: bweg dybp vykp eqth
//     },
//   });
  
//   // Step 2: Define the Email Options
//   const mailOptions = {
//     from: '"Reminder Bot" <gouravmodi1195@gmail.com>',
//     to: "hhhggg97340@gmail.com", // Receiver's email
//     subject: "Reminder: Task Due!",
//     text: "Hey! Just a reminder about your task. Don't forget to complete it!",
//   };
  
//   // Step 3: Schedule the Email
//   const reminderDate = new Date(2024, 11, 10, 13, 14, 10); // Example: Dec 10, 2024, 10:00 AM
  
//   schedule.scheduleJob(reminderDate, () => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error("Error sending email:", error);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });
//   });
  
//   console.log(`Reminder set for: ${reminderDate}`);
  
  