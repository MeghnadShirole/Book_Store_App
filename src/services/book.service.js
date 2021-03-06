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

//get all books
export const getAllBooks = async() => {
    const data = await Book.find();
    return data;
}

//get single book
export const getBook = async(_id) => {
    const data = await Book.findById({ _id });
    return data;
}

//update book
export const updateBook = async(_id, bookdata) => {
    const data = await Book.findByIdAndUpdate({
            _id
        },
        bookdata, {
            new: true
        }
    );
    return data;
};

//delete a book
export const deleteBook = async(id) => {
    await Book.findByIdAndDelete(id);
    return '';
};