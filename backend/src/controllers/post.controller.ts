import db from '../config/db'
import {Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import {getAuth} from "@clerk/express";
import cloudinary from "../config/cloudinary";

// Get all posts with users and comments with their users
export const getPosts = expressAsyncHandler(async (req: Request, res: Response) => {
    const posts = await db.post.findMany({
        include: {
            user: true,  // Get the user who created the post
            comments: {
                include: {
                    user: true,  // Get the user who made each comment
                }
            },
        }
    })

    res.status(200).json({posts})
})

// Get a single post with its user and comments with their users
export const getPost = expressAsyncHandler(async (req: Request, res: Response) => {
    const {postId} = req.params
    const post = await db.post.findUnique({
        where: {
            id: postId
        },
        include: {
            user: true,  // Get the user who created the post
            comments: {
                include: {
                    user: true,  // Get the user who made each comment
                }
            },
        }
    })

    if (!post) {
         res.status(404).json({message: "Post not found"})
        return
    }

    res.status(200).json({post})
})

// Get all posts for a specific user by their username
export const getUserPosts = expressAsyncHandler(async (req: Request, res: Response) => {
    const {username} = req.params

    // Find the user by username
    const user = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        res.status(404).json({message: "User not found"})
        return
    }

    // Get all posts for the found user
    const posts = await db.post.findMany({
        where: {
            userId: user.id  // Filter posts by userId
        },
        include: {
            user: true,  // Get the user who created the post
            comments: {
                include: {
                    user: true,  // Get the user who made each comment
                }
            },
        }
    })

    res.status(200).json({posts})  // Return posts for the user
})

export const createPost = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req)
    const {content} = req.body
    const imageFile = req.file;

    if(!content || !imageFile) {
        res.status(400).json({error: "Post must contain image or content"})
        return
    }

    const user = await db.user.findUnique({where:{clerkId:userId}})
    if(!user) {
        res.status(400).json({error: "User not found"})
        return
    }

    let imageUrl = ""

    if(imageFile) {
        try {
            const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString('base64')}`;
            const uploadResponse = await cloudinary.uploader.upload(base64Image, {
                folder:"social_media_posts",
                resource_type:"image",
                transformation:[
                    {width:800, height:600, crop:"limit"},
                    {quality:"auto"},
                    {format:"auto"}
                ]
            });
            imageUrl = uploadResponse.secure_url;
        }catch(uploadError) {
            console.error("Cloudinary upload error:", uploadError)
            res.status(400).json({error: "Failed to upload image"})
            return
        }
    }

    const post = await db.post.create({
        data:{
            userId:user.id,
            content,
            image:imageUrl,
        }
    })

    res.status(201).json({post})
})