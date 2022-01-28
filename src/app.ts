import express from 'express'
import defaultRouter from "./routers/defaultRouter";

const app = express()
app.use(express.json())
app.use(defaultRouter)

const PORT = process.env.APP_PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
