import express from 'express';
import { getMyProfile, RegisterUser, loginUser,logoutUser } from '../controllers/UserController.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post("/new",RegisterUser);
router.post('/login',loginUser);

router.get('/logout',logoutUser);
router.get("/me",isAuthenticated,getMyProfile);

export default router;