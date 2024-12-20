import { Request, Response } from "express"
import prisma from "../../config/prismaClient.ts"
import { currentUser } from "../../utils/adimAuth.ts";

const get = {

    post: (req: Request, res: Response) => {
        return;
    },

    posts: async (req: Request, res: Response) => {

        const { id } = req.user as currentUser;

        const posts = await prisma.post.findMany({
            where: { authorId: id }

        })

        res.json({ posts: posts })
        return;
    },

    comment: (req: Request, res: Response) => {
        return;
    },

    comments: (req: Request, res: Response) => {
        return;
    },

}

export default get;
