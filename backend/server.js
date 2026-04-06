import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import { connectDB } from "./config/db.js";
import doctorRouter from "./routes/doctorRouter.js";
import serviceRouter from "./routes/serviceRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import serviceAppointementRouter from "./routes/serviceAppointmentRouter.js";
import cloudinary from "./utils/cloudinary.js";


console.log("API KEY:", process.env.CLOUDINARY_API_KEY);



const app= express();
const port = 4000

const allowedOrigins=[
    "https://medicare-frontend-7gu0.onrender.com",
    "https://medicare-admin-4ton.onrender.com",
];


//Middlewares
app.use(cors(
    {
        origin:function(origin, callback){
            if(!origin) return callback(null, true);
            if(allowedOrigins.includes(origin)){
                return callback(null,true)
            }
            return callback(new Error("Not llowed by CORS"))
        },
        credentials:true,
        methods:["GET", "POST", "PUT", "DELETE","OPTIONS"],
        allowedHeaders:["Content-Type", "Authorization"]
    }
));
app.use(clerkMiddleware());
app.use(express.json({limit:"20mb"}));
app.use(express.urlencoded({limit:"20mb",extended:true}));


connectDB();

//Routes
app.use("/api/doctors",doctorRouter)
app.use("/api/services",serviceRouter)
app.use("/api/appointments",appointmentRouter)
app.use("/api/service-appointments",serviceAppointementRouter)





app.get("/",(req,res)=>{
    res.send("API Working")
});

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})