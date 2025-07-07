let myLibrary = [];

// ELEMENTS
const newBookBtn = document.getElementById("newBookBtn");
const newBookDialog = document.getElementById("newBookDialog");
const dialogCloseBtn = document.querySelectorAll(".dialogCloseBtn");
const newBookForm = document.getElementById("newBookForm");

const myLibraryList = document.getElementById("myLibraryList");

// EVENT LISTENERS
newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
})

dialogCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        newBookDialog.close();
    })
})

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const newBookData = {
        title: form.elements.bookTitle.value,
        author: form.elements.author.value,
        numOfPages: form.elements.pages.value,
        hasRead: form.elements.hasRead.checked,
    };
    addBookToLibrary({...newBookData});
    
    form.elements.bookTitle.value = '',
    form.elements.author.value = '',
    form.elements.pages.value = '',
    form.elements.hasRead.checked = false,
    
    newBookDialog.close();
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

function renderLibraryBooks() {
    myLibraryList.innerHTML = myLibrary.map(book => `
        <div id="book-${book.id}" class="bookCard">
            <div class="bookCardHeader">
                <h3 class="bookCardTitle" data-title="${book.title}">${book.title}</h3>
                <button class="bookCardDeleteBtn">X</button>
            </div>
            <p class="bookCardAuthor">by <span class="bookCardAuthorName" data-author="${book.author}">${book.author}</span></p>
            <p class="bookCardPages" data-pages=${book.numOfPages}># of Pages: ${book.numOfPages.toLocaleString('en-US')}</p>
            <p class="bookCardHasRead" data-has-read=${book.hasRead}>${book.hasRead ? 'Finished ✓' : 'Not Started/In Progress'}</p>
        </div>
      `).join('');
}

function addBookToLibrary({title, author, numOfPages, hasRead = false}) {
    const newBook = new Book (title, author, numOfPages, hasRead);
    myLibrary.push(newBook);
    renderLibraryBooks();
}