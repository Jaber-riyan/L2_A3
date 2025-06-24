import { z } from "zod";

export const ZBooks = z.object({
    title: z.string().trim(),
    author: z.string().trim(),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a non-negative number"),
    available: z.boolean().optional()
});
