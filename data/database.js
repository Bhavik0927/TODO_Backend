import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "BACKEND-TODO",
    })
    .then((e) => console.log(`Database Connected with ${e.connection.host}`))
    .catch((err) => console.log(err));
}