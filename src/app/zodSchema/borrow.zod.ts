import { z } from "zod";

export const ZBorrow = z.object({
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    quantity: z.number(),
    dueDate: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
            message: "Invalid date format"
        })
        .transform(val => new Date(val))
        .refine(date => date > new Date(), {
            message: "Due date must be in the future"
        })
})