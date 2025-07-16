// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to UI
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Clear form
UI.prototype.clearList = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Show alert
UI.prototype.showAlert = function (msg, className) {
  const div = document.createElement("div");
  div.className = className;
  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector(".container");
  const form = document.getElementById("book-form");
  container.insertBefore(div, form);

  setTimeout(() => div.remove(), 3000);
};

// Delete book
UI.prototype.deleteBookFromList = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Add Book event
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("⚠️ Please fill in all fields!", "error");
  } else {
    ui.addBookToList(book);
    ui.clearList();
    ui.showAlert("✅ Book added successfully!", "success");
  }
});

// Delete Event
document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBookFromList(e.target);
  if (e.target.className === "delete") {
    ui.showAlert("🗑️ Book removed", "error");
  }
});
