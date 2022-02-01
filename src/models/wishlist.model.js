import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
        userId: {

        },
        books: [{
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
            }
        }]
    },

    {
        timestamps: true,
        versionKey: false
    });

export default model('Wishlist', wishlistSchema)