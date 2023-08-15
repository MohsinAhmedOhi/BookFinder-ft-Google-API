const API_KEY = 'AIzaSyDKQhjiAsj-u0fctbQ5gfInvU8Mgm-u5vs';

function searchBooks() {
  const query = document.getElementById('searchInput').value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => displayResults(data.items));
}

function displayResults(books) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  books.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(', ')
      : 'Unknown Author';

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    bookDiv.appendChild(titleElement);

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author(s): ${authors}`;
    bookDiv.appendChild(authorElement);

    if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
      const imgElement = document.createElement('img');
      imgElement.src = book.volumeInfo.imageLinks.thumbnail;
      bookDiv.appendChild(imgElement);
    }

    resultsDiv.appendChild(bookDiv);
  });
}
