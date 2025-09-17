import db from '../config/db'
import expressAsyncHandler from "express-async-handler";
import {Request, Response} from "express";
import {getAuth} from "@clerk/express";

export const getNotifications = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req);

    const user = await db.user.findUnique({where:{clerkId:userId}})
    if(!user){
        res.status(404).send("User Not Found");
    }

    const notifications = await db.notification.findMany({
        where:{
            fromId: user.id,
        },
        include:{
            fromUser:true,
            user:true,
            post:true,
            comment:true
        }
    })

    res.status(200).send({notifications});
})
export const deleteNotifications = expressAsyncHandler(async (req: Request, res: Response) => {
    const {commentId} = req.params;
    const {userId} = getAuth(req);

    const user = await db.user.findUnique({where: {clerkId: userId}})
    if(!user){
        res.status(404).send("User Not Found");
        return;
    }

    const comment = await db.comment.findUnique({where:{id:commentId, userId:user.id}})
    if(!comment){
        res.status(404).send("Comment Not Found");
        return;
    }
    await db.notification.delete({where:{id:commentId}})
    res.status(200).json({message:"Comment Successfully Deleted"})
})