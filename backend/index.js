import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";

dotenv.config({
    path : "./.env"
});

connectDB().
then(() => {
    app.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running on Port ${process.env.PORT}`);
    }) 
}).catch((err) => {
    console.log('Database Connection failed !!' , err);
});