const library = [];
const addBtn = document.getElementById("plus");
const crossBtn = document.getElementById("cross");
const submitButton = document.getElementById("submit");
const grid = document.querySelector(".grid");

let bookIndex = 0;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  library.push(book);
}

function removeCard(index) {
  const card = document.querySelector(`[data-index="${index}"]`);
  card.remove();
  library.splice(index, 1);
}

function createCard(book) {
  const newCard = document.createElement("div");
  const btn = document.createElement("button");
  const read = document.getElementById("read");

  const elements = [
    { type: "p", text: book.title },
    { type: "p", text: book.author },
    { type: "p", text: `${book.pages} pages` },
  ];

  btn.classList.add("read-btn");
  
  if (btn.classList.contains("not-read") || read.checked) {
    btn.textContent = "Read";
    btn.classList.add("read");
    book.read = true;
  } else if (!read.checked || !book.read) {
    btn.textContent = "Not read";
    btn.classList.add("not-read");
    book.read = false;
  }

  btn.addEventListener("click", () => {
    btn.textContent = book.read ? "Not read" : "Read";
    btn.classList.toggle("read");
    btn.classList.toggle("not-read");
    book.read = !book.read;
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove");
  removeBtn.addEventListener("click", () => removeCard(bookIndex));

  elements.forEach(({ type, text }) => {
    const para = document.createElement(type);
    para.appendChild(document.createTextNode(text));
    newCard.appendChild(para);
  });

  newCard.appendChild(btn);
  newCard.appendChild(removeBtn);
  newCard.classList.add("card");
  newCard.dataset.index = bookIndex;
  grid.appendChild(newCard);
  bookIndex++;
}

function addCard() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read");
  const allInputs = document.querySelectorAll("input");
  addBookToLibrary(title, author, pages, read.value);
  const book = library[library.length - 1];

  document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    off();
    createCard(book);
    allInputs.forEach((input) => {
      return (input.value = "");
    });
    read.checked = false;
  };
}

function handleCardClick(event) {
  if (event.target.classList.contains("remove")) {
    const card = event.target.closest(".card");
    const { index } = card.dataset;
    removeCard(index);
  }
}

addBtn.addEventListener("click", () => on());
crossBtn.addEventListener("click", () => off());
submitButton.addEventListener("click", () => addCard());
grid.addEventListener("click", handleCardClick);
