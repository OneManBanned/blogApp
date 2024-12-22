import { Request, Response } from "express";
import prisma from "../../config/prismaClient.ts";
import { currentUser } from "../../utils/adimAuth.ts";
import asyncHandler from "express-async-handler";

const get = {
    post: asyncHandler(async (req: Request, res: Response) => {
        const { postId: id } = req.params as { postId: string };

        const post = await prisma.post.findUnique({
            where: {
                id: +id,
            },
        });

        res.json(post)
    }),

    posts: asyncHandler(async (req: Request, res: Response) => {

        const { author } = req.user as currentUser;
        let posts 

        author 
            ? posts = await prisma.post.findMany()
            : posts = await prisma.post.findMany({where: { published: true }})

        res.json({ posts: posts });
        return;
    }),

    comment: (req: Request, res: Response) => {
        return;
    },

    comments: (req: Request, res: Response) => {
        return;
    },
};

export default get;
