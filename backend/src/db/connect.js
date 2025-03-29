import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/we_theroy_project`);
        console.log(`MongoDB connected !! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error : ${error}`);
        return process.exit(-1);
    }
}

export default connectDB;