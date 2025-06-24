import express, { Application, Request, Response } from 'express'
import { borrowRoutes } from './app/controllers/borrow.routes'
import { booksRoutes } from './app/controllers/books.routes'
const morgan = require('morgan')

const app: Application = express()

// middleware 
app.use(express.json())
app.use(morgan("dev"))

// controllers 
app.use("/api/books",booksRoutes)
app.use("/api/borrow",borrowRoutes)


app.get('/', (req: Request, res: Response) => {
    res.json({
        status: true,
        message: "Note App Server Working Finely 🎉"
    })
})



export default app

/**
 * Basic File Structure
 * server file - server handling like - starting, closing, error handling of server, only related to server
 * app file - route handling, middleware handle, route related error handle
 * app folder - app business login handling like create, delete, update, retrieve, database related works
 */