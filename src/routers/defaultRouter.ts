import express from "express"
import {contactCallback} from "../route-handlers/contact"
import cors from "cors";
import {DEFAULT_CORS_OPTIONS} from "../common/config";

const defaultRouter = express.Router()
defaultRouter.use(cors(DEFAULT_CORS_OPTIONS))

defaultRouter.post('/contact', contactCallback)

export default defaultRouter
