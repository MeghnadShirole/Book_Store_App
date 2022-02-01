import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model'
import HttpStatus from 'http-status-codes';

//add book to wishlist
export const addBook = async(_id, wishlistData, res) => {
    const book = await Book.findOne({
        _id
    });

    const existingWishlist = await Wishlist.findOne({
        userId: wishlistData.userId
    });

    if (existingWishlist) {
        const existingBook = existingWishlist.books.find(bookInWishlist => bookInWishlist.bookId == _id)
        if (existingBook) {
            res.status(HttpStatus.NOT_ACCEPTABLE).json({
                code: HttpStatus.NOT_ACCEPTABLE,
                message: `The book is already present in wishlist`
            });
        } else {
            let newBook = {
                bookId: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
            };

            existingWishlist.books.push(newBook);

            await Wishlist.findByIdAndUpdate({
                _id: existingWishlist._id
            }, {
                $set: {
                    books: existingWishlist.books,
                },
            });
            existingWishlist, {
                new: true
            }
            return existingWishlist
        }
    } else {
        let userWishlist = new Wishlist({
            "userId": wishlistData.userId,
            "books": {
                bookId: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
            },
        })
        const newWishlist = await userWishlist.save();
        return newWishlist;
    }
}