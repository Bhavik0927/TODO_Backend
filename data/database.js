import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "BACKEND-TODO",
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
}