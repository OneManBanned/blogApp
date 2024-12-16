interface FormErrors {
    [key: string]: string
}

export function createErrorsMap(errors: any) {
    const errorsObj: FormErrors = {};
    for (let error of errors) {
        errorsObj[error.path] = error.msg;
    }
    return errorsObj;
}
