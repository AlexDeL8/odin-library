const myLibrary = [];

const newBookBtn = document.getElementById("newBookBtn")
newBookBtn.addEventListener("click", () => {
    console.log("new button clicked")
})

function Book(title, author, numOfPages, hasRead = false) {
    if(!new.target) {
        throw new Error("The 'new' operator must be used to call the constructor");
    }
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, has ${this.numOfPages} pages. `
}

function addBookToLibrary(title, author, numOfPages, hasRead = false) {
    libraryBooks.push(new Book(title, author, numOfPages, hasRead))
}