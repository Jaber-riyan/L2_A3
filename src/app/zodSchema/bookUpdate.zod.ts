// zod/books.validation.ts
import { z } from "zod";

export const ZBooksUpdate = z.object({
    title: z.string().trim().optional(),
    author: z.string().trim().optional(),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).optional(),
    isbn: z.string().optional(),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a non-negative number").optional(),
    available: z.boolean().optional()
});
