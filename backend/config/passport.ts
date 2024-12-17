import passport from "passport";
import prisma from "../config/prismaClient.ts";
import { validatePassword } from "../utils/passportUtils.ts";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

const verifyCallback = async (
    username: string,
    password: string,
    done: Function,
) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: username,
            },
        });

        if (!user) {
            return done(null, false, { message: "Incorrect username or password." });
        }

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

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET as string,
};

const jwtCallback = async (jwtPayload: any, done: Function) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: jwtPayload.id,
            },
        });
        if (user) {
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }
};

let localStrategy = new LocalStrategy(customFields, verifyCallback);
let jwtStrategy = new JwtStrategy(options, jwtCallback);

passport.use(localStrategy);
passport.use(jwtStrategy);
