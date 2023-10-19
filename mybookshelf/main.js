const booklist = [];
const RENDER_EVENT = "render-booklist";
const SAVED_EVENT = "saved-booklist";
const STORAGE_KEY = "BOOKLIST_APPS";

function generateId() {
  return +new Date();
}

function generateBooklistObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(booklist);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      booklist.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const books of booklist) {
    if (books.id === bookId) {
      return books;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in booklist) {
    if (booklist[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

function addBooklist() {
  const inputTitle = document.getElementById("title").value ?? null;
  const inputAuthor = document.getElementById("author").value ?? null;
  const inputYear = parseInt(document.getElementById("year").value);
  const isComplete = document.getElementById("isComplete").checked;

  const generatedID = generateId();
  const bookListObject = generateBooklistObject(
    generatedID,
    inputTitle,
    inputAuthor,
    inputYear,
    isComplete
  );

  console.log(bookListObject)

  if (inputTitle === null || inputAuthor === null || isNaN(inputYear)) {
    alert("Data tidak boleh kosong"); 
  } else {
    booklist.push(bookListObject);
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
function makeBookList(bookObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = bookObject.title;
  const textAuthor = document.createElement("p");
  textAuthor.innerText = `Penulis : ${bookObject.author}`;
  const textYear = document.createElement("p");
  textYear.innerText = `Tahun : ${bookObject.year}`;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `BookList-${bookObject.id}`);
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  container.append(buttonContainer);
  if (bookObject.isComplete) {
    const undoButton = document.createElement("button");
    undoButton.innerText = "Belum Selesai";
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.innerText = "Hapus Buku";
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeBook(bookObject.id);
    });

    buttonContainer.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.innerText = "Sudah Dibaca";
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.innerText = "Hapus Buku";
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeBook(bookObject.id);
    });

    buttonContainer.append(checkButton, trashButton);
  }

  return container;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  if (confirm("Apakah anda yakin ingin menghapus buku ini?")) {
    booklist.splice(bookTarget, 1);
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
function undoTaskFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function searchBook() {
  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value.toLowerCase();

  const filteredBooklist = booklist.filter((book) => {
    const title = book.title.toLowerCase();
    return title.includes(searchQuery);
  });

  const uncompletedBookList = document.getElementById("booklist");
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementById("completed-booklist");
  completedBookList.innerHTML = "";

  for (const bookListItem of filteredBooklist) {
    const bookElement = makeBookList(bookListItem);
    if (!bookListItem.isComplete) {
      uncompletedBookList.append(bookElement);
    } else {
      completedBookList.append(bookElement);
    }
  }

  const allBooks = document.querySelectorAll(".book-item");
  allBooks.forEach((book) => {
    if (
      book
        .querySelector(".book-title")
        .textContent.toLowerCase()
        .includes(searchQuery)
    ) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBooklist();
    submitForm.reset();
  });

  const submitSearch = document.getElementById("search-form");
  submitSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById("booklist");
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementById("completed-booklist");
  completedBookList.innerHTML = "";

  const checkbox = document.getElementById("isComplete");
  const submitButton = document.getElementById("submitButton");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      submitButton.value = "Tambah ke Buku Sudah di Baca";
    } else {
      submitButton.value = "Tambah ke Buku Belum di Baca";
    }
  });

  for (const bookListItem of booklist) {
    const bookElement = makeBookList(bookListItem);
    if (!bookListItem.isComplete) {
      uncompletedBookList.append(bookElement);
    } else completedBookList.append(bookElement);
  }
});
