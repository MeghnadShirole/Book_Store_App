import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        price: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        description: {
            type: String,
        }
    },

    {
        timestamps: true,
        versionKey: false
    });

export default model('Book', bookSchema)