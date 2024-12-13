import bcrypt from "bcryptjs"

export function validatePassword(password: string, hash: string, salt: string): boolean {
    const hashVerify = bcrypt.hashSync(password, salt)
    return hash === hashVerify;
}
