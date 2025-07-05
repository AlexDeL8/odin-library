const myLibrary = [];

// ELEMENTS
const newBookBtn = document.getElementById("newBookBtn");
const newBookDialog = document.getElementById("newBookDialog");
const dialogCloseBtn = document.querySelectorAll(".dialogCloseBtn");

// EVENT LISTENERS
newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal()
})

dialogCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        newBookDialog.close()
    })
})

// LOGIC
function Book(title, author, numOfPages, hasRead = false) {
    if(!new.target) {
        throw new Error("The 'new' operator must be used to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, has ${this.numOfPages} pages. `;
}

function addBookToLibrary(title, author, numOfPages, hasRead = false) {
    libraryBooks.push(new Book(title, author, numOfPages, hasRead));
}