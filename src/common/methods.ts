import {PROJECT_NAME} from "./config";

export const getEmailSubject = (topic: string, recipient: string) => `[${PROJECT_NAME}] ${topic} (${recipient})`;
