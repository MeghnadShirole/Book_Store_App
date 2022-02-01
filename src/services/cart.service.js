import Cart from '../models/cart.model';
import Book from '../models/book.model'

//create a new book
export const addBook = async(_id, cartData) => {
    const book = await Book.findOne({
        _id
    });

    const availableQuantity = book.quantity

    const existingCart = await Cart.findOne({
        userId: cartData.userId
    });

    if (existingCart) {
        if (availableQuantity == 0) {
            return (`Sorry..We're out of stock`)
        } else {
            const existingBook = existingCart.book.find(bookInCart => bookInCart.bookId == _id)

            if (existingBook) {
                existingBook.quantity += 1;
                existingCart.cart_total = existingCart.cart_total + existingBook.price;

                const updatedCart = await Cart.findByIdAndUpdate({
                    _id: existingCart._id
                }, {
                    book: existingCart.book,
                    cart_total: existingCart.cart_total,
                }).exec();
                updatedCart, { upsert: true },
                await Book.findByIdAndUpdate({
                    _id: book._id
                }, {
                    $set: {
                        quantity: availableQuantity - 1
                    },
                });
                book, {
                    new: true
                }
                return updatedCart;
            } else {
                book.quantity = 1;

                let newBook = {
                    bookId: book._id,
                    quantity: book.quantity,
                    price: book.price,
                };
                existingCart.book.push(newBook)

                const cart = await Cart.findByIdAndUpdate({
                    _id: existingCart._id
                }, {
                    $set: {
                        book: existingCart.book,
                        cart_total: existingCart.cart_total + book.quantity * book.price,
                    },
                });
                cart, {
                    new: true
                },
                await Book.findByIdAndUpdate({
                    _id: book._id
                }, {
                    $set: {
                        quantity: availableQuantity - book.quantity
                    },
                });
                book, {
                    new: true
                }
                return cart;
            }
        }
    } else {
        if (availableQuantity == 0) {
            return (`Sorry..We're out of stock`)
        } else {

            book.quantity = 1;
            let userCart = new Cart({
                "userId": cartData.userId,
                "book": {
                    bookId: book._id,
                    quantity: book.quantity,
                    price: book.price,
                },
                "cart_total": book.quantity * book.price,
                "isPurchased": false
            })

            const newCart = await userCart.save();
            await Book.findByIdAndUpdate({
                _id: book._id
            }, {
                $set: {
                    quantity: availableQuantity - book.quantity
                },
            });
            book, {
                new: true
            }
            return newCart;
        }
    }
}