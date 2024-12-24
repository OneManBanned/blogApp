export class CustomUnAuthorizedError extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
        this.statusCode = 401;
    }
}

export class CustomBadRequestError extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "BadRequest";
        this.statusCode = 400;
    }
}
