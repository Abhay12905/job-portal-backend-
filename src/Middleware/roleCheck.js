export const roleCheck = (...roles)=>{
    return (req,res,next)=>{
        if(!req.user.role){
            return res.status(403).json({status:"failed",message:"No role found"})
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({status:"failed",message:"Not authorized"})
        }

        next()
    }
}