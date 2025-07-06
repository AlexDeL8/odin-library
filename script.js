const myLibrary = [];

// ELEMENTS
const newBookBtn = document.getElementById("newBookBtn");
const newBookDialog = document.getElementById("newBookDialog");
const dialogCloseBtn = document.querySelectorAll(".dialogCloseBtn");
const newBookForm = document.getElementById("newBookForm");

const myLibraryList = document.getElementById("myLibraryList")

// EVENT LISTENERS
newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal()
})

dialogCloseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        newBookDialog.close()
    })
})

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target
    const newBookData = {
        title: form.elements.bookTitle.value,
        author: form.elements.author.value,
        numOfPages: form.elements.pages.value,
        hasRead: form.elements.hasRead.checked,
    }
    addBookToLibrary({...newBookData})
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

function addBookToLibrary({title, author, numOfPages, hasRead = false}) {
    myLibrary.push(new Book(title, author, numOfPages, hasRead));
    myLibraryList.innerHTML += `
        <div class="bookCard">
            <div class="bookCardHeader">
                <h3 class="bookCardTitle">${title}</h3>
                <button class="bookCardDeleteBtn">X</button>
            </div>
            <p class="bookCardAuthor">${author}</p>
            <p class="bookCardPages">${numOfPages}</p>
            <p class="bookCardHasRead">${hasRead ? 'Finished ✓' : 'Not Started/In Progress'}</p>
        </div>
    `;
}