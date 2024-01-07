import mongoose, { Schema } from "mongoose";

const SavedDataSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    saveAs:{
        type: String,
        required: true,
    },
    nitrogen: {
        type: Number,
        required: true,
    },
    phosphorus: {
        type: Number,
        required: true,
    },
    potassium: {
        type: Number,
        required: true,
    },
    soilType:{
        type: String,
        required:true,
    },
    cropType:{
        type:String,
        required: true,
    },
    area:{
        type: Number,
        required: true,
    },
},{timestamps:true}
);

const SavedDataModel = mongoose.model('savedData', SavedDataSchema);
export default SavedDataModel;