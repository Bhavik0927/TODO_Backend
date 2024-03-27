import express from 'express';
import { newTask, getMyTask, updateTask, deleteTask } from '../controllers/TaskController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/new", isAuthenticated, newTask)

router.get("/mytask", isAuthenticated, getMyTask);

router
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

export default router;
