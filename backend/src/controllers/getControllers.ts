import {Request, Response} from "express"
import prisma from "../../config/prismaClient.ts"

const get = {
    
    post: (req: Request, res: Response)  => {
        return;
    },

    posts: (req: Request, res: Response)  => {

        res.json({posts: 'here are all the posts'})
        return;
    },

    comment: (req: Request, res: Response)  => {
        return;
    },

    comments: (req: Request, res: Response)  => {
        return;
    },

}

export default get;
