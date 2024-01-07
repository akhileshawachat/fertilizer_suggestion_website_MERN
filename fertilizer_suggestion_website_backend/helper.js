import jwt from 'jsonwebtoken';

let helper = {
    checkIfuser:function(req,res,next){
        try{
            let header = req.headers.authorization;
            if(!header){
                throw({
                    message:"Authorization header is required"
                })
            }
            else{
                let splitToken = header.split(' ');
                let token = splitToken[1];
                if(!token) throw({
                    message:"Authorization headerr is required"
                })
                let userData = jwt.verify(token,process.env.JWT_SECRET);
                if(!userData){
                    res.status(401);
                    return res.send("Unauthorized user")
                }
                next();
            }
            }catch(error){
                console.log("error",error)
                res.status(401);
                return res.send("Unauthorized user")
        }
    },
}

// module.exports = helper;
export default helper;