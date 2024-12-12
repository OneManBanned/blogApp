import {Request, Response} from "express"
import prisma from "../../config/prismaClient.ts"

const controller = {
    
    getPosts: (req: Request, res: Response)  => {

        res.json({posts: 'here are all the posts'})
        return;
    }

    getPost: (req: Request, res: Response)  => {
        return;
    }

    getComment: (req: Request, res: Response)  => {
        return;
    }

    getComments: (req: Request, res: Response)  => {
        return;
    }

}

export default controller;
