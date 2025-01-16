import express from "express";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import {signIn, signUp,
   createReminder, getReminder, postReminder, updateReminders,
   publicLogin, adminLogin, editorLogin,
   getPost, savePost,
   leaderboardData,
   chatWithAI,
   // chatPost, chatGet, 
} from "../controllers/user.js"

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

router.get('/public', publicLogin);
router.get('/admin', authenticate, authorize(['admin']), adminLogin);
router.get('/editor', authenticate, authorize(['admin', 'editor']), editorLogin);

router.get('/post', getPost);
router.post('/post', savePost);


router.get('/leaderboard', leaderboardData);
router.post("/chat", chatWithAI);
// router.get('/chat', chatPost);

// router.get('/reminder', authenticateToken, getReminder);
// router.post('/reminder', authenticateToken, postReminder);
// router.post('/reminder', authenticateToken, createReminder);
// router.put('/reminder/:id/acknowledge', authenticateToken, updateReminders);

// router.delete('/:id', deleteUser);
// router.patch('/:id',editUser);


export default router;
