import mongoose from "mongoose"

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://Vaibhav:Vaibhav123@cluster0.s9mdkjl.mongodb.net/MediCare")
    .then(()=>{
        console.log(" Connected DB")
    })
}