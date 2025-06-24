import express, { Request, Response } from 'express'
import { ZBooks } from '../zodSchema/books.zod'
import { Book } from '../models/books.model'

export const booksRoutes = express.Router()

// Add a Book Into the Mongodb
booksRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body

        const parsed = ZBooks.safeParse(body)

        if (!parsed.success) {
            res.status(400).json({
                message: "Validation error",
                success: false,
                error: parsed.error?.format(),
            });
            return
        }

        const book = await Book.create(parsed.data)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: { ...book }
        })


    } catch (error: any) {
        res.json({
            status: false,
            error: error.message
        });
    }
})

