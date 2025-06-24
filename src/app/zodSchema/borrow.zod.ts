import { z } from "zod";

export const ZBorrow = z.object({
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
    quantity: z.number(),
    dueDate: z.date()
})