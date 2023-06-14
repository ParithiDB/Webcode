let currentPage = 1;
const cardsPerPage = 2;

async function fetchData() {
  try {
    let response = await fetch("https://anapioficeandfire.com/api/books");
    const result = await response.json();
    createPagination(result);
    currentPage = 1; 
    showCards(result, currentPage);
  } catch (error) {
    console.log(error);
  }
}

function createPagination(data) {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const prevButton = createButton("Previous", "prevButton", "btn btn-primary", true);
  const nextButton = createButton("Next", "nextButton", "btn btn-primary");
  const pageButtons = document.createElement("div");
  pageButtons.id = "pageButtons";

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showCards(data, currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showCards(data, currentPage);
    }
  });

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(i.toString(), "pageButton", "btn btn-light", false);
    pageButton.addEventListener("click", function () {
      currentPage = i;
      showCards(data, currentPage);
    });
    pageButtons.appendChild(pageButton);
  }

  const paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageButtons);
  paginationContainer.appendChild(nextButton);

  document.body.appendChild(paginationContainer);

  showCards(data, currentPage); 
}

function createButton(text, id, className, disabled) {
  const button = document.createElement("button");
  button.textContent = text;
  button.id = id;
  button.className = className;
  button.disabled = disabled || false;
  return button;
}

function showCards(data, page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const booksListingContainer = document.getElementById("book");
  booksListingContainer.innerHTML = "";

  if (data.length > 0) {
    const cardsArray = data.slice(startIndex, endIndex).map((d) => {
      const cardNode = document.createElement("div");
      cardNode.className = "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12";
      const cardContainer = document.createElement("div");
      cardContainer.className = "container";
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.style.maxWidth = "540px";
      const row = document.createElement("div");
      row.className = "row g-0";
      const col1 = document.createElement("div");
      col1.className = "col-md-4";
      const imageContainer = document.createElement("div");
      imageContainer.className = "imageContainer";
      const image = document.createElement("img");
      image.src =
        "https://media.istockphoto.com/id/535570181/photo/blank-red-book.jpg?s=170667a&w=0&k=20&c=BWlIHDYQD93O7L4qd0pphxutyHAiliEFdvaoLk8Pjqw=";
      image.className = "img-fluid rounded-start";
      image.alt = "book";
      const caption = document.createElement("div");
      caption.className = "caption center";
      caption.textContent = d.name;
      imageContainer.appendChild(image);
      imageContainer.appendChild(caption);
      col1.appendChild(imageContainer);
      col1.innerHTML += `
        <p class="isbn_pages"><b>ISBN : </b>${d.isbn}</p>
        <p class="isbn_pages"><b>No. of Pages : </b>${d.numberOfPages}</p>
        <p class="isbn_pages"><b>Publisher :</b> ${d.publisher}</p>
        <p class="isbn_pages"><b>Released Date : </b>${d.released}</p>
      `;

      const col2 = document.createElement("div");
      col2.className = "col-md-8";
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const cardTitle = document.createElement("h4");
      cardTitle.className = "card-title";
      cardTitle.textContent = d.name;
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      const text1 = document.createElement("p");
      text1.className = "text-h";
      const authorLabel = document.createElement("b");
      authorLabel.className = "text-h";
      authorLabel.textContent = "Author : ";
      const author = document.createElement("span");
      author.textContent = d.authors;
      text1.appendChild(authorLabel);
      text1.appendChild(author);
      cardText.appendChild(text1);
      const country = document.createElement("p");
      country.textContent = "Country : " + d.country;
      const mediaType = document.createElement("p");
      mediaType.textContent = "Media Type : " + d.mediaType;
      const characterLinks = [];
      for (let i = 0; i < 5; i++) {
        if (d.characters[i]) {
          const characterLink = document.createElement("a");
          characterLink.href = d.characters[i];
          characterLink.target = "_blank";
          characterLink.className =
            "link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";
          characterLink.textContent = "Click to view character " + (i + 1) + " in the book.";
          characterLinks.push(characterLink);
        }
      }
      const buyBtnContainer = document.createElement("div");
      buyBtnContainer.className = "buy-btn";
      const buyNowBtn = createButton("Buy now", "buyNowBtn", "btn btn-info");
      const downloadBtn = createButton("Download E-book", "downloadBtn", "btn btn-outline-success");
      buyBtnContainer.appendChild(buyNowBtn);
      buyBtnContainer.appendChild(downloadBtn);

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(country);
      cardBody.appendChild(mediaType);
      characterLinks.forEach((link) => {
        cardBody.appendChild(link);
      });
      cardBody.appendChild(document.createElement("br"));
      cardBody.appendChild(buyBtnContainer);

      col2.appendChild(cardBody);

      row.appendChild(col1);
      row.appendChild(col2);

      card.appendChild(row);
      cardContainer.appendChild(card);
      cardNode.appendChild(cardContainer);

      return cardNode;
    });
    cardsArray.forEach((card) => {
      booksListingContainer.appendChild(card);
    });
  }

  updatePaginationButtons(); 
}

function updatePaginationButtons() {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
