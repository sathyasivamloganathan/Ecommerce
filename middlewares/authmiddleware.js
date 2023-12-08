import JWT from 'jsonwebtoken'
import userModal from '../modals/userModal.js';

export const requireSignIn = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch(err){
        console.log(err)
    }
}

export const isAdmin = async(req, res, next) => {
    try{
        const user = await userModal.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        else{
            next();
        }
    } catch(err){
        console.log(err)
        return res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            err,
        })
    }
}