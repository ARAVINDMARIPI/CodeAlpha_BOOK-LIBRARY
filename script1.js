let books = JSON.parse(localStorage.getItem("books")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

// Add book
function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let category = document.getElementById("category").value;
    let imageInput = document.getElementById("image").files[0];

    if (title && author && imageInput) {
        let imageUrl = URL.createObjectURL(imageInput); // Convert file to URL

        books.push({ title, author, category, image: imageUrl, borrowed: false });
        saveToLocalStorage();
        displayBooks();
    }
}

// Display books
function displayBooks(filteredBooks = books) {
    let bookList = document.getElementById("book-list");
    bookList.innerHTML = "";
    
    filteredBooks.forEach((book, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${book.image}" class="book-cover">
            <div>
                <strong>${book.title}</strong> - ${book.author} (${book.category})
                <br>
                <button class="borrow-btn" onclick="borrowBook(${index})">
                    ${book.borrowed ? "Return" : "Borrow"}
                </button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

// Borrow/Return book
function borrowBook(index) {
    books[index].borrowed = !books[index].borrowed;
    
    if (books[index].borrowed) {
        history.push(`${books[index].title} borrowed`);
    } else {
        history.push(`${books[index].title} returned`);
    }
    
    saveToLocalStorage();
    displayBooks();
    displayHistory();
}

// Display borrowing history
function displayHistory() {
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    
    history.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Search books
function searchBooks() {
    let searchText = document.getElementById("search").value.toLowerCase();
    let filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchText) || 
        book.author.toLowerCase().includes(searchText)
    );
    displayBooks(filteredBooks);
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("history", JSON.stringify(history));
}

// Load stored data on startup
window.onload = function() {
    displayBooks();
    displayHistory();
};
