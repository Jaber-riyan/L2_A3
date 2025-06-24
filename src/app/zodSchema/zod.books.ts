import { z } from "zod";

export const ZBooksModel = z.object({
    title:z.string().trim(),
    author:z.string().trim(),
    genre:z.string(),
    isbn:z.string(),
    description:z.string().optional(),
    copies:z.number().min(0),
    available:z.boolean().optional()
})