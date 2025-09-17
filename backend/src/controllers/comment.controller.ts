import db from '../config/db'
import expressAsyncHandler from "express-async-handler";
import {Request, Response} from "express";
import {getAuth} from "@clerk/express";

export const getComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const {postId} = req.params;
    const post = await db.post.findUnique({where:{id:postId}});
    if (!post) {
        res.status(404).json({error: "Post not found"});
        return;
    }
    const comments = await db.comment.findMany({
        where: {
            postId
        },
        sort: { createdAt: -1 },
        include: {
            user: true
        }
    })

    res.status(200).json({comments});
})
export const createComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const {postId} = req.params;
    const {userId} = getAuth(req)
    const {content} = req.body;

    if(!content || !content.trim()) {
        res.status(400).json({error: "Comment content is required"});
    }

    const [post, user] = await Promise.all([
        db.post.findUnique({where:{id:postId}}),
        db.user.findUnique({where: {clerkId: userId}})
    ]);

    if(!post || !user) {
        res.status(404).json({error: "Post not found"});
        return;
    }

    const comment = await db.comment.create({
        data:{
            postId,
            userId:user.id,
            content
        }
    })

    res.status(200).json({comment});
})
export const deleteComment = expressAsyncHandler(async (req: Request, res: Response) => {
    const {commentId} = req.params;

    const comment = await db.comment.findUnique({where:{id:commentId}});
    if (!comment) {
        res.status(404).json({error: "Post not found"});
        return;
    }
    await db.comment.delete({where:{id:commentId}});
    res.status(200).json({message: "Comment deleted successfully"});
})