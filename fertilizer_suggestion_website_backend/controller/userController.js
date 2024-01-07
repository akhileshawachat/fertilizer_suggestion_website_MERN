import SavedDataModel from "../models/SavedData.js";

export const addToSavedData = async(req,res) => {
    try {
        let data = req.body;
    
        let UpdatedResponse = await SavedDataModel.create(data);

        res.status(200).json({
            status:true,
            statusCode:200,
            data: UpdatedResponse,
            message: "Data added successfully",
        })
    }catch(err)
{
    console.log("err",err);
    res.status(400).json({
        status:false,
        statusCode:400,
        message:"Something went wrong while adding data",
        error: err,
    })
}};

export const editSavedData = async(req,res)=> {
    try{
        let data = req.body;
        let UpdatedResponse = await SavedDataModel.findByIdAndUpdate(data.id,{$set:{saveAs:data.saveAs}},{new:true});
        res.status(200).json({
            status:true,
            statusCode:200,
            data:UpdatedResponse,
            message: "Data edited successfully",
            
        })
    }catch (err) {
        console.log("err",err)
        res.status(400).json({
          status:false,
          statusCode:400,
          message:"Something went wrong while editing data",
          error:err,
        })
    }
};

export const deleteSavedData = async(req,res) => {
    try{
        let data = req.params;
    
        let updatedResponse = await SavedDataModel.findByIdAndDelete(data.id);

        res.status(200).json({
            status: true,
            statusCode:200,
            data:updatedResponse,
            message:"Data deleted successfully",
        })
    }catch(err){
        console.log("err",err)
        res.status(400).json({
            satuts:false,
            statusCode:400,
            message:"Something went wrong while deleting the data",
            error: err,
        })
    }
};

export const fetchSavedDataForuser = async(req,res) => {
    try{
        let data = req.params;
        let updatedResponse = await SavedDataModel.find({userId:data.id});

        res.status(200).json({
            status:true,
            statusCode:200,
            data:updatedResponse,
            message:"Data fetched successfully",
        })
    }catch(err){
        console.log("err",err)
        res.status(400).json({
        status:false,
        statusCode:400,
        message:"Something went wrong while fetching data",
        error:err,
        })
    }
};

// module.exports = {
//     addToSavedData,
//     editSavedData,
//     deleteSavedData,
//     fetchSavedDataForuser,
// }