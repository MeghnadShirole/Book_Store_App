import Book from '../models/book.model';

//create a new book
export const newBook = async(bookData) => {
    var newbook = new Book({
        "title": bookData.title,
        "author": bookData.author,
        "price": bookData.price,
        "quantity": bookData.quantity,
        "description": bookData.description
    })
    const data = await newbook.save(bookData);
    return data;
}