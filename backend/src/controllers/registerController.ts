import { Request, Response } from "express";
import {
    body,
    FieldValidationError,
    validationResult,
} from "express-validator";
import asyncHandler from "express-async-handler";
import { genPassword } from "../../utils/passportUtils.ts";
import { createErrorsMap } from "../../utils/createErrMap.ts";
import prisma from "../../config/prismaClient.ts";

const validateUserRegistration = [
    body("name").notEmpty().withMessage("required"),
    body("email")
        .notEmpty()
        .withMessage("required")
        .isEmail()
        .withMessage("must be valid email")
        .custom(async (value) => {
            prisma.user.findUniqueOrThrow({ where: { email: value } });
        })
        .withMessage("email already registered"),
    body("password").notEmpty().withMessage("required"),
    body("confirmPassword")
        .notEmpty()
        .withMessage("required")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("passwords don't match"),
];

const register = {
    user: [
        validateUserRegistration,
        asyncHandler(async function(req: Request, res: Response) {
            const valid = validationResult(req);

            if (!valid.isEmpty()) {
                const errors = createErrorsMap(valid.array({ onlyFirstError: true }));
                res.json(errors);
            } else {
                const { name, email, password } = req.body;

                // create hash
                const saltHash = genPassword(password);
                const { salt, hash } = saltHash;

                // save uesr to db
                await prisma.user.create({
                    data: { name, email, hash, salt },
                });

                res.json({success: "true"})
            }
        }),
    ],
};

export default register;
