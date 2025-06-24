import { model, Schema } from 'mongoose';
import { IBooks } from '../interfaces/books.interface';

const bookSchema = new Schema<IBooks>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        genre: {
            type: String,
            enum: {
                values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
                message: "Genre is not valid, got {VALUE}"
            },
            uppercase: true,
            trim: true
        },
        isbn: { type: String, required: true, unique: true, trim: true },
        description: { type: String },
        copies: {
            type: Number,
            required: true,
            min: [0, "Copies must be a non-negative number"]
        },
        available: { type: Boolean, default: true }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

export const Book = model<IBooks>("Book", bookSchema);
