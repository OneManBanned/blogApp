import passport from "passport";
import prisma from "../config/prismaClient.ts";
import { validatePassword } from "../utils/passportUtils.ts";
import { Strategy as LocalStrategy } from "passport-local";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async ( username: string, password: string, done: Function,) => {

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: username,
      },
    });

    if (!user) { return done(null, false, { message: "Incorrect username or password." }); }

    const { hash, salt } = user;
    const valid = validatePassword(password, hash, salt);

    if (!valid) {
      return done(null, false, { message: "Incorrect username or password." });
    } else {
      return done(null, user);
    }

  } catch (err) {
    done(err);
  }

};

let strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.deserializeUser(async (userId: string, done) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({where: {
            id: +userId
        }})
        done(null, user);
    } catch(err) {
        done(err);
    }
});
