export const successhandler = (res,statusCode,status,message,data=null)=>{
    return res.status(statusCode).json({status,message,data})
}