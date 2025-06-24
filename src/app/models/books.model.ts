import { model, Schema } from 'mongoose'
import { IBooks } from '../interfaces/books.interface'

const bookSchema = new Schema<IBooks>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String, enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Genre is not valid, got {VALUE}"
        }, uppercase: true, trim: true
    },
    isbn: { type: String, unique: [true, "this isbn already used, try with another one"], required: true },
    description: { type: String },
    copies: {
        type: Number, validate: {
            validator: function (value) {
                return value > 0
            },
            message: props => `${props.value} is not a positive number. please try with positive number`
        }, required: true, min: 0
    },
    available: { type: Boolean, default: true }
})

export const Book = model("Book", bookSchema)
