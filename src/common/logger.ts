export const logger = {
    error: (errorMessage: string) => {
        console.error(`[${new Date().toISOString().split('T')[0]}] ${errorMessage}`)
    },
    log: (message: string) => {
        console.log(`[${new Date().toISOString().split('T')[0]}] ${message}`)
    }
}
