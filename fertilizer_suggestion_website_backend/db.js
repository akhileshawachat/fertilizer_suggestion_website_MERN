import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.MONGO_URL;

mongoose.set('strictQuery',true);
const connectToMongo = ()=>{
    try{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to mongodb");
    });
    
    }catch(error){
        console.log(error.message)
    }
}



export default connectToMongo;



//  require : module.export

//import : export default.