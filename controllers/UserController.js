import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "../middlewares/error.js";

export const RegisterUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User already Exist", 404))

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400))

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404))

        sendCookie(user, res, `Welcome back,${user.name}`, 200)
    } catch (error) {
        next(error)
    }

}

export const logoutUser = async (req, res, next) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = async (req, res,next) => {
    try {
        const id = "myid";

        const { token } = req.cookies;

        if (!token)
            return res.status(404).json({
                success: false,
                message: "Login First"
            });

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded._id);

        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        next(error)
    }
}