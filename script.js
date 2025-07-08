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
        title: form.elements.bookTitle.value.trim(),
        author: form.elements.author.value.trim(),
        numOfPages: form.elements.pages.value,
        hasRead: form.elements.hasRead.checked,
    };
    addBookToLibrary({...newBookData});
    
    form.elements.bookTitle.value = '';
    form.elements.author.value = '';
    form.elements.pages.value = '';
    form.elements.hasRead.checked = false;
    
    newBookDialog.close();
})

myLibraryList.addEventListener("click", (event) => {
    if(event.target.classList.contains("bookCardDeleteBtn")) {
        const bookCard = event.target.closest(".bookCard");
        const bookId = bookCard.id.substring(5);
        myLibrary = myLibrary.filter(bookObj => bookObj.id !== bookId);
    } else if(event.target.classList.contains("bookCardHasReadToggleBtn")) {
        const bookCard = event.target.closest(".bookCard");
        const bookId = bookCard.id.substring(5);
        for(let bookObj of myLibrary) {
            if(bookObj.id === bookId) {
                bookObj.hasRead = !bookObj.hasRead
                break;
            }
        }
    }
    renderLibraryBooks();
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
        <li id="book-${book.id}" class="bookCard">
            <div class="bookCardHeader">
                <h3 class="bookCardTitle" data-title="${book.title}">${book.title}</h3>
                <button class="bookCardDeleteBtn">X</button>
            </div>
            <p class="bookCardAuthor">by <span class="bookCardAuthorName" data-author="${book.author}">${book.author}</span></p>
            <p class="bookCardPages" data-pages=${book.numOfPages}># of Pages: ${book.numOfPages.toLocaleString('en-US')}</p>
            <p class="bookCardHasRead" data-has-read=${book.hasRead}>${book.hasRead ? 'Finished <i class="bookCardHasReadToggleBtn fa-solid fa-book"></i>' : 'Not Started/In Prog. <i class="bookCardHasReadToggleBtn fa-solid fa-book-open"></i>'}</p>
        </li>
      `).join('');
}

function addBookToLibrary({title, author, numOfPages, hasRead = false}) {
    const newBook = new Book (title, author, numOfPages, hasRead);
    myLibrary.push(newBook);
    renderLibraryBooks();
}