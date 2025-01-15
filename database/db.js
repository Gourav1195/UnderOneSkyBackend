import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, }, 
    email: { type: String, }, 
    role: {type: String, default: 'user'},
    // managerEmail: { type: String, required: true,}, 
    
    password: { type: String, required: true}, 
    score: {
        type: Number,
        default: 0,
      },
      matches: {
        type: Number,
        default: 0,
      },
      winrate: {
        type: Number,
        default: 0,
      },
      region: {
        type: String,
        default: "Global",
      },
    }, { timestamps: true 
})
const User = mongoose.model("User", userSchema);

const reminderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},    
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // userId: { type: String, ref: "User"},    
    // managerId: { type: String, ref: "User" },  
    topic: { type: String }, 
    message: { type: String,}, 
    dueDate: {type: Date },
    isAcknowledged: { type: Boolean, default: false}, 
});

const Reminder = mongoose.model("Reminder", reminderSchema);

const postSchema = new mongoose.Schema({
    heading: {type: String, required: true},
    image: {type: String},
    copy: {type: String},
    timestamp: {type: Date, default: Date.now} 
})

const Post = mongoose.model("Post", postSchema);

export {User, Reminder, Post};
