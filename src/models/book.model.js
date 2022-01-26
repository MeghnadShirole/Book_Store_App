import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        price: {
            type: String,
        },
        quantity: {
            type: String,
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