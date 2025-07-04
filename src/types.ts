export interface IBook {
  _id: string,
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}
[];

export interface IBorrowBook {
  book: string,
  quantity: number;
  dueDate: Date,
}

export interface IBookData {
  title: string;
  author: string;
  genre:
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean
};

export interface BooksCardProps {
  booksData: IBook[];
}

export interface IBorrowBooksModalProps {
  bookId: string;
  availableCopies: number;
}