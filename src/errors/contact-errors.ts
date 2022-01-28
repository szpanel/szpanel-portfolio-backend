export class ContactError extends Error {
    constructor(message) {
        super(message);
    }
}

export class GoogleRecaptchaError extends ContactError {
    constructor() {
        super('Google Recaptcha Error');
    }
}
