import { Schema, model } from "mongoose";

const cartSchema = new Schema({
        userId: {

        },
        book: [{
            bookId: {

            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }],
        cart_total: {
            type: Number
        },
        isPurchased: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true,
        versionKey: false
    });

export default model('Cart', cartSchema)