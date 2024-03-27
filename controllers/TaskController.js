import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/Task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userID = req.user._id;

        const tasks = await Task.find({ user: userID });

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler("Tasks not found", 400));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task is updated"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return next(new ErrorHandler())

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task is Deleted"
        })
    } catch (error) {
        next(error)
    }
}