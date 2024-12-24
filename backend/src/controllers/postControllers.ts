import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createErrorsMap } from "../../utils/createErrMap";
import { body, validationResult } from "express-validator";
import prisma from "../../config/prismaClient";
import { currentUser } from "../../utils/adminAuth";

interface PostInput {
  title: string;
  content: string;
  publish: string;
}

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("required")
    .isLength({ max: 256 })
    .withMessage("title is too long"),
  body("content").notEmpty().withMessage("required"),
];

const post = {
  post: [
    ...validatePost,
    asyncHandler(async (req: Request, res: Response) => {
      const valid = validationResult(req);
      if (!valid.isEmpty()) {
        const errors = createErrorsMap(valid.array({ onlyFirstError: true }));
        res.json(errors);
      } else {
        const { title, content, publish } = req.body as PostInput;
        const { id: authorId } = req.user as currentUser;

        const published = publish == "on" ? true : false;
        await prisma.post.create({
          data: { title, content, published, authorId },
        });
        res.json({ success: true});
      }
    }),
  ],

  comment: (req: Request, res: Response) => {
    return;
  },
};

export default post;
