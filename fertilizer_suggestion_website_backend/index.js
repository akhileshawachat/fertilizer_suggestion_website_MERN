import express  from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
import connectToMongo from "./db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js"


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

connectToMongo();


let port = process.env.PORT;

app.get("/",(req,res)=>{
    res.status(200).send("Hi from server");
});

app.get("/connect-to-server",(req,res)=>{
    res.status(200).send("Connected to server");
});

app.use('/auth',authRoute);
app.use('/user',userRoute);

app.listen(port,()=>console.log(`Server listening at port ${port}`));