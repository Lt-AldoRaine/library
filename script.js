const addBookButton = document.querySelector(".add-button");
const overlay = document.querySelector(".overlay");
const addBookModal = document.querySelector(".add-book-modal");
const bookContainer = document.querySelector(".books-container");
const form = document.querySelector(".add-book-form");
const errorMsg = document.querySelector(".error-msg");

let library = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  get inLibrary() {
    return this.inLibrary();
  }

  inLibrary = (newBook) => {
    library.some((book) => book.title === newBook.title);
  };
}

const openBookModal = () => {
  form.reset();
  overlay.classList.add("active");
  addBookModal.classList.add("active");
};

const clickOffModal = () => {
  overlay.classList.remove("active");
  addBookModal.classList.remove("active");
  errorMsg.classList.remove("active");
  errorMsg.textContent = " ";
};

const getBook = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("haveRead").checked;

  return new Book(title, author, pages, isRead);
};

const addBook = () => {
  event.preventDefault();
  const newBook = getBook();

  if (newBook.inLibrary(newBook)) {
    errorMsg.classList.add("active");
    errorMsg.textContent = "Book already in library";
    return;
  } else library.push(newBook);
  // console.log(library.length);
  showBook();
  clickOffModal();
};

const removeBook = () => {
  for (let item of library) {
    library.splice(library.indexOf(item), 1);
    showBook();
  }
};

const showBook = () => {
  const books = document.querySelectorAll(".book");

  books.forEach((book) => bookContainer.removeChild(book));
  for (let i = 0; i < library.length; i++) {
    createBook(library[i]);
  }
};

const resetGrid = () => {
  const books = document.querySelectorAll(".book");

  bookContainer.removeChild(books);
};

const createBook = (item) => {
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("p");
  const authorDiv = document.createElement("p");
  const pagesDiv = document.createElement("p");
  const bookButtons = document.createElement("div");
  const isReadButton = document.createElement("button");
  const removeButton = document.createElement("button");

  bookDiv.classList.add("book");
  bookButtons.classList.add("book-buttons");
  isReadButton.classList.add("btn");
  removeButton.setAttribute("class", "btn");
  titleDiv.textContent = `"${item.title}"`;
  authorDiv.textContent = `${item.author}`;
  pagesDiv.textContent = `${item.pages} pages`;
  removeButton.textContent = "Remove";

  bookDiv.appendChild(titleDiv);
  bookDiv.appendChild(authorDiv);
  bookDiv.appendChild(pagesDiv);
  bookDiv.appendChild(bookButtons);
  bookButtons.appendChild(isReadButton);
  bookButtons.appendChild(removeButton);
  bookContainer.appendChild(bookDiv);

  if (item.isRead === true) {
    isReadButton.textContent = "Have read";
    isReadButton.classList.add("green");
  } else {
    isReadButton.textContent = "Have not read";
    isReadButton.classList.add("red");
  }

  isReadButton.addEventListener("click", () => {
    item.isRead = !item.isRead;
    showBook();
  });

  removeButton.onclick = removeBook;
};

addBookButton.onclick = openBookModal;
overlay.onclick = clickOffModal;
form.onsubmit = addBook;
