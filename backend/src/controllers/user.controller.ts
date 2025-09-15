import {Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import db from '../config/db'

import {clerkClient, getAuth} from "@clerk/express";
import type {Follow, User} from "../generated/prisma";

export const getUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const {username} = req.params;

    const user: User | null = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        res.status(400).json({message: 'User not found'});
        return;
    }

    res.status(200).json({user})
});

export const updateProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req);

    const user: User | null = await db.user.update({
        where: {
            clerkId: userId
        },
        data: req.body
    });

    if (!user) {
        res.status(400).json({message: 'User not found'});
        return;
    }

    res.status(200).json({user});
})

export const syncUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req);
    const existingUser = await db.user.findUnique({
        where: {
            clerkId: userId
        }
    });
    if (!existingUser) {
        res.status(400).json({message: 'User not found'});
        return;
    }

    const clerkUser = await clerkClient.users.getUser(String(userId));

    const userData = {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split('@')[0],
        profilePicture: clerkUser.imageUrl || ""
    }

    const user: User | null = await db.user.create({
        data: userData,
    })

    res.status(200).json({user, message: 'User created Successfully'})
})

export const getCurrentUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req);
    const user: User | null = await db.user.findUnique({
        where: {
            clerkId: userId
        }
    });
    if (!user) {
        res.status(400).json({message: 'User not found'});
        return;
    }
    res.status(200).json({user})
})

export const followUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const {userId} = getAuth(req);
    const {targetUserId} = req.params;

    if (targetUserId === userId) {
        res.status(400).json({message: 'You can\'t follow yourself'});
    }

    const [currentUser, targetUser] = await Promise.all([
        db.user.findUnique({where: {clerkId: userId}, include: {following: true}}),
        db.user.findUnique({where: {clerkId: targetUserId}}),
    ]);

    if (!targetUser || !currentUser) {
        res.status(400).json({message: 'User not found'});
        return;
    }

    const isFollowing = currentUser.following.some(
        (follow: Follow) => follow.followerId === targetUser.id
    );

    if (isFollowing) {
        await db.user.update({
            where: {id: currentUser.id},
            data: {
                following: {
                    disconnect: {followerId: targetUser.id},
                },
            },
        });

    } else {
        await db.user.update({
            where: {id: currentUser.id},
            data: {
                following: {
                    connect: {followerId: targetUser.id},
                },
            },
        });

        await db.notification.create({
            data: {
                from: currentUser.id,
                to: targetUserId,
                type: 'follow',
            }
        })
    }


    res.status(200).json({message: isFollowing ? 'User unfollow successfully' : 'User follow successfully'})

})