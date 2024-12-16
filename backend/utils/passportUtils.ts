import bcrypt from "bcryptjs"

export function genPassword(password: string): { salt: string, hash: string } {
    const salt = bcrypt.genSaltSync(10);
    const genHash = bcrypt.hashSync(password, salt)

    return {
        salt: salt, 
        hash: genHash
    }
}

export function validatePassword(password: string, hash: string, salt: string): boolean {
    const hashVerify = bcrypt.hashSync(password, salt)
    return hash === hashVerify;
}
