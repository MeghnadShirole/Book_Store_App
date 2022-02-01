import { Schema, model } from "mongoose";

const cartSchema = new Schema({
        userId: {

        },
        book: [{
            bookId: {

            },
            title: {
                type: String,
            },
            author: {
                type: String,
            },
            price: {
                type: Number,
            },
            description: {
                type: String,
            }
        }]
    },

    {
        timestamps: true,
        versionKey: false
    });

export default model('Cart', cartSchema)