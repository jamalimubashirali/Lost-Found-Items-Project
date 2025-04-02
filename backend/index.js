import dotenv from "dotenv";
import connectDB from "./src/db/connect.js";
import { app } from "./src/app.js";
import {createServer} from "http"
import { Server } from "socket.io";


dotenv.config({
    path : "./.env"
});

connectDB().
then(() => {
    const server = createServer(app);
    const io = new Server(server , {});
    io.on("connection" , (socket) => {
        console.log(`New User Connected ${socket.id}`);
        socket.on("disconnect" , () => {
            console.log("User disconnected Successfully");
        });
    })
    server.listen(process.env.PORT || 3000 , () => {
        console.log(`Server is running on Port ${process.env.PORT} the socketId is`);
    }) 
}).catch((err) => {
    console.log('Database Connection failed !!' , err);
});

// const server = createServer(app);
//     const io = new Server(server , {});
//     io.on("connection" , (socket) => {
//         console.log(`New User Connected ${socket.id}`);
//         socket.on("disconnect" , () => {
//             console.log("User disconnected Successfully");
//         });
        
//     })
//     server.listen(process.env.PORT || 3000 , () => {
//         console.log(`Server is running on Port ${process.env.PORT}`);
//     }) ;