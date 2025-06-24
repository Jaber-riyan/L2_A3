import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },
        quantity: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value > 0
                },
                message: props => `${props.value} is not a positive number. please try with positive number`
            }
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export const Borrow = model("Borrow", borrowSchema)
