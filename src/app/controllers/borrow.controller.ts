import express, { Request, Response } from 'express'
import { ZBorrow } from '../zodSchema/borrow.zod'
import { Borrow } from '../models/borrow.model'
import { Book } from '../models/books.model'

export const borrowRoutes = express.Router()

// Borrow a book
borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body

        const parsed = ZBorrow.safeParse(body)
        if (!parsed.success) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: parsed.error.format(),
            });
            return
        }

        const { book: bookId, quantity, dueDate } = parsed.data;

        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return
        }

        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: `Only ${book.copies} copies available`,
            });
            return
        }

        // Deduct copies 
        book.copies -= quantity

        // Update availability using instance method
        await book.updateAvailability()

        // Save borrow record
        const borrow = await Borrow.create({
            book: book._id,
            quantity,
            dueDate,
        })

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });

    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to borrow book",
            success: false,
            error: error.message || error,
        });
    }
})

// Get borrowed books summary
borrowRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: {
                        $sum: "$quantity"
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                    totalQuantity: 1,
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error: any) {
        res.status(500).json({
            message: "Failed to get borrowed summary",
            success: false,
            error: error.message || error,
        });
    }
})
