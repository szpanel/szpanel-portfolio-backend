import {logger} from "../common/logger";
import {VERIFY_GOOGLE_RECAPTCHA_API_URL} from "../common/config";
import axios from "axios";

export interface GoogleRecaptchaResponse {
    success: boolean,
    challenge_ts: string,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    hostname: string,         // the hostname of the site where the reCAPTCHA was solved
    'error-codes'?: any[]        // optional
}

export const verifyUserReCaptchaResponse = async (token: string): Promise<GoogleRecaptchaResponse> => {
    try {
        const params = new URLSearchParams()
        params.append('secret', process.env.RECAPTCHA_SECRET_KEY)
        params.append('token', token)
        const axiosResponse = await axios.post<GoogleRecaptchaResponse>(
            VERIFY_GOOGLE_RECAPTCHA_API_URL,
            null,
            {params}
        )
        return axiosResponse.data
    } catch (error) {
        logger.error(`google-recaptcha error: ${error}`)
        throw error
    }
}

