import CoverMockup from '../assets/imgs/cover-mockup.jpg';
import HPCover from '../assets/imgs/HP.png';

const HPbooks = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K Rowling",
    price: 29.99,
    genre: "Aventura",
    availableQtd: "10",
    soldQtd: "5",
    description: "",
    img: HPCover
  },
  {
    id: 2,
    title: "Harry Potter 2",
    author: "J.K Rowling",
    price: 14.89,
    genre: "Aventura",
    availableQtd: "7",
    soldQtd: "2",
    description: "",
    img: HPCover
  },
]

const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
  + " Vivamus vitae lobortis augue, in ultrices mi. Morbi sagittis, justo et"
  + " pulvinar iaculis, enim metus malesuada erat, non vehicula urna dolor at"
  + " nisi. Fusce ut rhoncus ligula. In sed tincidunt lacus. Integer pretium"
  + " molestie luctus. Curabitur quis hendrerit dui. Aliquam venenatis eu quam"
  + " quis facilisis. Proin consectetur turpis dui, eleifend pulvinar est"
  + " fermentum vel. Nullam eu purus blandit, venenatis nisl at, pulvinar"
  + " tellus. Mauris sit amet lacinia lectus. Sed molestie faucibus mauris,"
  + " in tincidunt nibh. Nam condimentum tortor nec magna bibendum luctus. "
 


let maxId = 2

function generateBookMocks(genre, amount) {
  const range = [...Array(amount).keys()] 
  const generated = range.map((idx) => {
    return {
      id: maxId + idx,
      title: `Algum livro de ${genre} ${idx}`,
      author: "Algum autor",
      price: (100 * Math.random()).toFixed(2),
      genre: genre,
      availableQtd: Math.round(100 * Math.random()).toString(),
      soldQtd: Math.round(100 * Math.random()).toString(),
      description: LoremIpsum,
      img: CoverMockup
    }
  });
  maxId += amount;
  return generated;
}

const bookGenres = [
  "Mistério",
  "Aventura",
  "Romance",
  "Autoajuda",
  "Direito",
  "Economia",
  "Ciências",
  "Tecnologia"
]

const books = HPbooks.concat(bookGenres.reduce((acc, genre) => {
  return acc.concat(generateBookMocks(genre, 3))
}, []));


let callsCounter = 1

function bookToPreview(book) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    price: book.price,
    genre: book.genre,
    img: book.img
  };
}

export function getBookPreviews(activeFilters) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      callsCounter = (callsCounter + 1) % 5;
      if (callsCounter === 0) {
        console.log(callsCounter);
        reject();
      } else {
        resolve(
          books.filter((book) => activeFilters[book.genre]).map(bookToPreview)
        );
      }
    })
  });
}

// mock a server response
export async function getBooks() {
  // mock one second delay from server
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return [
    {
      id: 1,
      title: "Harry Potter",
      price: "29.99",
      availableQtd: "10",
      soldQtd: "5",
    },
    {
      id: 2,
      title: "Harry Potter 2",
      price: "14.89",
      availableQtd: "7",
      soldQtd: "2",
    },
  ];
}
