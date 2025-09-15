import {Request, Response, NextFunction} from "express";

export const protectRoute = async (req:Request, res:response, next:NextFunction) => {
    if(!req.auth().isAuthenticated()) {
        return res.status(401).json({message: 'Not authorized'});
    }
    next();
}

