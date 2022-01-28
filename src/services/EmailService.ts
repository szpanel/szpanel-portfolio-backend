import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library/build/src/auth/oauth2client";
import {Transporter, createTransport} from "nodemailer";
import {Options} from "nodemailer/lib/mailer";
import {logger} from "../common/logger";
import {EMAIL_SERVICE_NAME} from "../common/config";

export class EmailService {
    private static REDIRECT_URI = "https://developers.google.com/oauthplayground";

    private oauth: OAuth2Client;

    constructor() {
        this.oauth = new google.auth.OAuth2({
            clientId: process.env.OAUTH2_CLIENT_ID,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET_KEY,
            redirectUri: EmailService.REDIRECT_URI,
        })
        this.oauth.setCredentials({
            refresh_token: process.env.OAUTH2_REFRESH_TOKEN
        })
    }

    protected async getAccessToken() {
        try {
            return (await this.oauth.getAccessToken()).token
        } catch (error) {
            logger.error(`Error getAccessToken: ${error}`)
            throw error
        }
    }

    private async createTransporter(): Promise<Transporter> {
        try {
            return createTransport({
                service: EMAIL_SERVICE_NAME,
                auth: {
                    user: process.env.EMAIL,
                    type: "OAuth2",
                    clientId: process.env.OAUTH2_CLIENT_ID,
                    clientSecret: process.env.OAUTH2_CLIENT_SECRET_KEY,
                    accessToken: await this.getAccessToken(),
                    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
                },
            })
        } catch (error) {
            logger.error(`Error createTransporter: ${error}`)
            throw error
        }
    }

    async sendEmail(options: Options) {
        try {
            await (await this.createTransporter()).sendMail(options)
        } catch (error) {
            throw error
        }
    }
}
