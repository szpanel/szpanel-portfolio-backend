import cors from "cors"

export const PROJECT_NAME = 'szpanel-portfolio'
export const VERIFY_GOOGLE_RECAPTCHA_API_URL = 'https://www.google.com/recaptcha/api/siteverify'

export const EMAIL_SERVICE_NAME = 'gmail'

export const DEFAULT_CORS_OPTIONS: cors.CorsOptions = {
    origin: [
        'http://localhost:3001'
    ],
}
