import mongoose from 'mongoose';
import {User} from './database/db.js'
import dotenv from 'dotenv'

dotenv.config();
// Sample user data
const users = [
  { name: 'JohnDoe', email: 'john@example.com', password: 'password123', score: 1500, matches: 30, winrate: 75.5, region: 'USA' },
  { name: 'JaneSmith', email: 'jane@example.com', password: 'password123', score: 1800, matches: 40, winrate: 80.0, region: 'Europe' },
  { name: 'PlayerOne', email: 'player1@example.com', password: 'password123', score: 1200, matches: 25, winrate: 70.2, region: 'Asia' },
  { name: 'ProGamer', email: 'pro@example.com', password: 'password123', score: 2200, matches: 50, winrate: 85.4, region: 'Australia' },
  { name: 'AlphaWolf', email: 'alpha@example.com', password: 'password123', score: 2000, matches: 45, winrate: 82.1, region: 'India' },
];

// Connect to MongoDB and seed the database
const seedDatabase = async () => {
  try {
    // Connect to your MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "skyBackend",
      });

    console.log('Connected to MongoDB.');

    // Clear existing data
    await User.deleteMany({});
    console.log('Existing users removed.');

    // Insert sample data
    await User.insertMany(users);
    console.log('Sample users added.');

    process.exit();
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
