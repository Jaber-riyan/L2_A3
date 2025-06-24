import express, { Request, Response } from 'express'
import { ZBooks } from '../zodSchema/books.zod'
import { Book } from '../models/books.model'
import { SortOrder, Types } from 'mongoose'
import { ZBooksUpdate } from '../zodSchema/bookUpdate.zod'

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
            data: book
        })

    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error: error.message || error,
        });
    }

})

// Get all Books from Mongodb
booksRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const filter = (req.query.filter as string) || undefined;
        const sortBy = (req.query.sortBy as string) || 'createdAt';
        const sort = (req.query.sort as string) || 'asc';
        const limit = parseInt(req.query.limit as string) || 10;

        const allowedGenres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
        const allowedSortFields = ['createdAt', 'title', 'author', 'copies', 'available'];

        if (filter && !allowedGenres.includes(filter as string)) {
            res.status(400).json({
                success: false,
                message: `Invalid genre filter. Allowed genres: ${allowedGenres.join(', ')}`
            });
            return
        }

        if (!allowedSortFields.includes(sortBy as string)) {
            res.status(400).json({
                success: false,
                message: `Invalid sortBy field. Allowed fields: ${allowedSortFields.join(', ')}`
            });
            return
        }

        const limitNumber = Number(limit);
        if (isNaN(limitNumber) || limitNumber > 50) {
            res.status(400).json({
                success: false,
                message: 'Limit must be a positive number not exceeding 50',
            });
            return
        }

        const query: any = {}
        if (filter) {
            query.genre = filter
        }

        const sortOrder: SortOrder = sort === 'desc' ? -1 : 1
        const sortObj = { [sortBy as string]: sortOrder }

        const books = await Book.find(query).sort(sortObj).limit(Number(limit))

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error: error.message || error,
        });
    }
})

// Get a single Book From Mongodb
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId

        const book = await Book.findById(bookId)

        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error: error.message || error,
        });
    }
})

// Update a single Book from Mongodb
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params

        if (!Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid book ID',
            });
            return
        }

        const parsed = ZBooksUpdate.safeParse(req.body)
        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: parsed.error.format(),
            });
            return
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            parsed.data,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
            return
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        })

    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error: error.message || error,
        });
    }
})

// Delete a single Book from Mongodb
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId

        const book = await Book.findByIdAndDelete(bookId)

        res.json({
            success: true,
            message: "Book deleted successfully",
            data: book
        })
    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to retrieve books",
            success: false,
            error: error.message || error,
        });
    }
})
