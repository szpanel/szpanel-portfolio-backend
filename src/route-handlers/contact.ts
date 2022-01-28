import {EmailService} from "../services/EmailService";
import {logger} from "../common/logger";
import {getEmailSubject} from "../common/methods";
import {ContactError, GoogleRecaptchaError} from "../errors/contact-errors";
import {verifyUserReCaptchaResponse} from "../verifiers/google-recaptcha";

enum Topic {
    ORDER = "Order",
    QUESTION = "Question",
    OTHER = "Other",
}

interface IContact {
    recipient: string;
    topic: Topic;
    email: string;
    content: string;
    test: boolean;
}

interface ContactRequestBody extends IContact {
    token: string;
}

const emailService = new EmailService();

export const contactCallback = async (req, res) => {
    const body: ContactRequestBody = req.body
    try {
        const isVerified = await verifyUserReCaptchaResponse(body.token)
        if (!isVerified) {
            return sendErrorResponse(new GoogleRecaptchaError(), res)
        }
        if (body.test) {
            return res.json({success: true})
        }
        await emailService.sendEmail({
            subject: getEmailSubject(body.topic, body.recipient),
            to: process.env.EMAIL,
            text: `${body.email}\n${body.content}`,
        })
        return res.json({
            success: true
        })
    } catch (error) {
        logger.error(`Error occured while sending an email: ${error}`)
        return sendErrorResponse(error, res)
    }
}

const sendErrorResponse = (error: ContactError, response) => {
    return response.json({
        success: false,
        error: error,
    })
}
