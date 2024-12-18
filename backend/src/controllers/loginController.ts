import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import passport from "passport";
import jwt from "jsonwebtoken";

const loginValidation = [
  body("email").notEmpty().withMessage("required"),
  body("password").notEmpty().withMessage("required"),
];

const login = {
  login: async (req: Request, res: Response) => {
    passport.authenticate(
      "local",
      { session: false },
      (err: Error, user: any, info: any) => {
        if (err || !user) {
          return res.json({
            password: "invalid password or email",
            user: user,
          });
        }

        req.login(user, { session: false }, (err) => {
          if (err) {
            return res.send(err);
          }

          const token = jwt.sign(user, process.env.SECRET as string, {
            expiresIn: '10h',
          });
          return res.json({ user, token, success: true });
        });
      },
    )(req, res);
  },
};

export default login;
