const dialog = document.getElementById("bookDialog");
const openBtn = document.getElementById("showDialog");
const cancelBtn = document.querySelector("button[type='button']")
const form = document.getElementById("bookForm")
const display=document.getElementById("bookList")
const myLibrary=[];

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, status){
    const newBook = new Book(author, title, pages, status);
    myLibrary.push(newBook);

}

openBtn.addEventListener("click",()=>{
    dialog.showModal();
});

cancelBtn.addEventListener("click",()=>{
    dialog.close();
    form.reset();
})


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const author = form.author.value;
    const title = form.title.value;
    const pages = form.pages.value;
    const status = form.status.value;

    addBookToLibrary(author, title, pages, status);

    dialog.close();
    form.reset();
    renderLibrary();
});

function renderLibrary(){
    display.innerHTML ="";

    myLibrary.forEach((book)=>{
        const bookDiv=document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.setAttribute("data-id",book.id);

        bookDiv.innerHTML = `
        <p><strong>${book.title}</strong> by ${book.author} (${book.pages} pages) —
           <em>Status: ${book.status}</em>
        <button class="toggle" data-id="${book.id}">Change Status</button>
        <button class="remove" data-id="${book.id}">Remove</button></p>
        `;
        display.appendChild(bookDiv);

    });
    document.querySelectorAll(".remove").forEach(button=>{
        button.addEventListener("click",(e)=>{
            const id = e.target.dataset.id;
            removeBook(id);
        })
    })

    document.querySelectorAll(".toggle").forEach(select=>{
        select.addEventListener("click",(e)=>{
            const id = e.target.dataset.id;
            toggleStatus(id);
        })
    })
}

function removeBook(id) {
    // Find index of book with matching id
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);  // Remove book from array
        renderLibrary();              // Re-render list
    }
}

function toggleStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (!book) return;

    const statuses = ["reading", "finished", "on-hold"];
    const currentIndex = statuses.indexOf(book.status);
    const nextIndex = (currentIndex + 1) % statuses.length;

    book.status = statuses[nextIndex];
    renderLibrary();
}


