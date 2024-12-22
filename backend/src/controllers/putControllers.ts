import asyncHandler from "express-async-handler";
import prisma from "../../config/prismaClient";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
import { createErrorsMap } from "../../utils/createErrMap";

const validatePost = [
    body("title")
        .notEmpty()
        .withMessage("required")
        .isLength({ max: 256 })
        .withMessage("title is too long"),
    body("content").notEmpty().withMessage("required"),
];

const put = {
    post: [
        ...validatePost,
        asyncHandler(async (req: Request, res: Response) => {

            const valid = validationResult(req)

            if (!valid.isEmpty()) {
                const errors = createErrorsMap(valid.array({ onlyFirstError: true }))
                res.json(errors)
            }

            const { title, content, publish } = req.body;
            const { postId } = req.params;
            const published = publish == "on" ? true : false;

            await prisma.post.update({
                where: {
                    id: +postId,
                },
                data: {
                    title,
                    content,
                    published,
                },
            });


            res.json({ success: true });
        }),
    ],

    comment: (req: Request, res: Response) => { },
};

export default put;
