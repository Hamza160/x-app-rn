import {aj} from '../config/arcjet'
import {Request, Response, NextFunction} from "express";

export const arcjetMiddleware = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const decision = await aj.protect(req, {requested:1})
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({
                    error:"Too Many Requests",
                    message:"Rate limit exceeded. Please try again later."
                })
                return
            }else if(decision.reason.isBot()){
                res.status(403).json({
                    error:"Bot access denied",
                    message:"Automated requests not allowed"
                })
                return
            }else{
                res.status(403).json({
                    error:"Forbidden",
                    message:"Access denied by security policy",
                })
                return
            }
        }

        if(decision.results.some(result => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({
                error:"Spoof bot detected",
                message:"Malicious bot activity detected"
            })
            return
        }

        next()

    }catch(err){
        console.error("Arcjet middleware error", err)
        next()
    }
}