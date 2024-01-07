import UserModel  from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const JET = process.env.JWT_SECRET;

export const createUser = async (req,res) => {
    try{


        
        let user = await UserModel.findOne({ email: req.body.email });

        if(user){
            throw {
                message: "User already exists",
            };
        }

        
        let salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        
        user = await UserModel.create({ 
            email: req.body.email,
            name: req.body.name,
            password: secPass,
        });


        let data = {
            id: user._id,
            email: user.email,
        };

        let jwtOptions = { expiresIn: "72h" };

        // Prepare user data for JWT payload
        let authToken = jwt.sign(data,JET,jwtOptions);

        // Update the user document with the generated token
        let jwtUserResponse = await UserModel.findByIdAndUpdate(
            user._id,
            {token:authToken},
            {new: true}
        );

        
        delete jwtUserResponse.password;

        res.status(201).json({
            status: true,
            data:jwtUserResponse,
            message: "user created successfully",
        });
    }catch(err){
        res.status(400).json({
            status:false,
            message: err.message,
            data :err,
        });
    }
};

export const login = async (req,res) => {
    try{
        let {email,password} = req.body;
        if(!email || !password){
            res.status(401).json({
                status:false,
                statusCode: 401,
                message:"Invalid email and password"
            })
        }

        // check if user exists
        let user = await UserModel.findOne({ email });

        if(!user){
            throw {
                message: "Email is not registered",
            };
        }

        let passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            throw {message:"Wrong Credentials"};
        }
        let data = {
            user:{
                id:user._id,
                email: user.email,
            }
        }
        
        let jwtOptions = { expiresIn: "72h" };

        // Prepare user data for JWT payload
        let authToken = jwt.sign(data,JET,jwtOptions);
        
        

        // Update the user document with the generated token
        let jwtUserResponse = await UserModel.findOneAndUpdate(
            {_id:user._id},
            {token:authToken},
            {new: true}).select('-password');

            res.status(200).json({
                status:true,
                statusCode:200,
                message:"Login Successful",
                data:jwtUserResponse,
            })
        
    }catch(err){
        res.status(400).json({
            status:false,
            statusCode:400,
            message:err.message,
            errr:err,
        })
    }
}

