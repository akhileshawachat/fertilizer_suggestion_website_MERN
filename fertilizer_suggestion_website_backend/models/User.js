import mongoose, { Schema } from "mongoose";




const UserSchema = new Schema({
        name:{
         type:String,
         required: true,
      },
     email: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         required: true,
     },
        token: {
         type: String,
         }
    },
    {timestamps: true}
);

const UserModel = mongoose.model('user',UserSchema);
export default UserModel;