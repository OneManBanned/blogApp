import asyncHandler from "express-async-handler";
import {Request, Response} from "express"
import prisma from "../../config/prismaClient";

const del = {

    post: asyncHandler( async (req: Request, res: Response) => {

        const { postId } = req.params

        await prisma.post.delete({
            where: {
                id: +postId
            }
        })
                
        res.json({success: true})

    }),

    comment: asyncHandler( async (req: Request, res: Response) => {
        const { commentId } = req.params
        
        await prisma.comment.delete({
            where: {
                id: +commentId
            }
        })

        res.json({success: true})
    }),
}

export default del;
