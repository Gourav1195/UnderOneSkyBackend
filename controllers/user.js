
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User, Reminder, Post } from '../database/db.js'

const jwt_sec = process.env.JWT_SECRET ;

//sign-in/sign-up
export const signUp = async(req, res) => {
  const {username, email, password} = req.body;
  
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('hashedPassword', hashedPassword)
      
      const user = new User({username, email, password : hashedPassword});
      await user.save();
      
      const token = jwt.sign({id: user._id, role: user.role}, jwt_sec, {expiresIn: "1h"});
      // const token = jwt.sign({ test: "data" }, jwt_sec);

      res.status(201).json({ message: "User saved successfully", user, token})


  } catch (error) {
    console.error(error);
      res.status(400).json({error: "Failure to save user", details: error.message})
  }
};

export const signIn = async(req, res) => {
  const {email, password} = req.body;
  console.log('Request body:', req.body);
  try{
    // const user = users.find((u) => u.username === username);
      const user = await User.findOne({ email });
      if(!user){
        return res.status(404).json({error : "user not found!"});
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
        return res.status(401).json({ error : "Invalid Password"})
      }
      //valid login
      const token = jwt.sign({id: user._id, role: user.role}, jwt_sec, {expiresIn: "10h"});
      console.log('JWT Token: ', token);
      res.status(200).json({user: {name: user.username, email: user.email, id:user._id}, 
        message: "successfully logged in",
        token})

  } catch (error) {
      res.status(500).json({error: "failed to sign-in"})
  }
};


//Reminder
export const createReminder =async(req, res)=>{
  const {userId, managerId, message, dueDate} = req.body;

  try{
    const reminder = new Reminder({
      userId,
      managerId,
      topic,
      message,
      dueDate,
      isAcknowledged,
    });
    await reminder.save();
    res.status(201).json({message: "Reminder Created Successfully", reminder});
  } catch(error){
    console.error(error);
    res.status(500).json({message: 'Error creating reminder', error});
  }
};

export const updateReminders = async(req, res) => {
  const {id} = req.params;
  try {
    const reminder = await Reminder.findById(id);
    if(!reminder){
      return res.status(404).json({message: 'Reminder not found'})
    }
    reminder.isAcknowledged = true;
    await reminder.save();

    res.status(200).json({message: "Reminder acknowledged", reminder});
    
  } catch (error) {
    res.status(500).json({message: "Error acknowledging reminder", error})
  }
};

export const getReminder = async(req, res) => {
  try{
    const {id} = req.query;
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }
    

    const reminder = await Reminder.findById(id); // Match `_id` field
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.status(200).json(reminder);
  }
  catch(error){
    res.status(500).json({message: "error while fetching reminders", error});
  }
};

export const postReminder = async(req, res) => {
  try{
    const {id} = req.body;
    const reminders = await Reminder.findById(id);

    res.status(200).json(reminders);
  }
  catch(error){
    res.status(500).json({message: "error while fetching reminders", error});
  }
};

//login
export const publicLogin = (req, res) => {
  res.json({ message: 'This is a public route' });
}
export const adminLogin = (req, res) => {
  res.json({ message: 'This is a public route' });
}
export const editorLogin = (req, res) => {
  res.json({ message: 'This is a public route' });
}


//post
export const savePost = async(req, res)=>{
  const {heading, image, copy} = req.body;
  try {
    const newPost = new Post({heading, image, copy}) ;
    await newPost.save();

    res.status(201).json({message: "Post created", post: newPost});
  } catch (error) {
    res.error(500).json({message:'server error', error});
  }
}

export const getPost = async(req, res) => {
  try{
    const post = await Post.find().sort({timestamp: -1});
    res.status(200).json(post);
  }
  catch(error){
    res.error(500).json({message:"Server error", error})
  }
}