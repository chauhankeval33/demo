import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./env'
})


connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log(`mongodb connection failed::`,err);
})












// import express from "express"
// const app=express()

// (async()=>{
//     try {
//         mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error");
//             throw error;

//             app.listen(process.env.PORT,()=>{
//                 console.log(`app is listening on ${process.env.PORT}`);
//             })
//         })
//     } catch (error) {
//         console.log("error",error);
//         throw error
        
//     }
// })()

