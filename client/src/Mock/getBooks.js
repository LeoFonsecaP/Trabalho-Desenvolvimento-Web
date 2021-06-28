import CoverMockup from '../assets/imgs/cover-mockup.jpg';
import HPCover from '../assets/imgs/HP.png';
import HPCover2 from '../assets/imgs/HP2.png';
import HPPreview from '../assets/imgs/Preview1.png';
import PreviewMockup from '../assets/imgs/preview-mockup.png';



const HPbooks = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K Rowling",
    price: 29.99,
    genre: "Aventura",
    availableQtd: "10",
    soldQtd: "5",
    description: " Harry Potter e a Pedra Filosofal é o primeiro dos sete livros da série de fantasia Harry Potter, escrita por J. K. Rowling. O livro conta a história de Harry Potter, um órfão criado pelos tios que descobre, em seu décimo primeiro aniversário, que é um bruxo. No romance, são narrados seus primeiros passos na comunidade bruxa, sua entrada na Escola de Magia e Bruxaria de Hogwarts e o início de sua amizade com Rony Weasley e Hermione Granger, os quais o ajudam a enfrentar Lord Voldemort — Lorde das Trevas e assassino dos pais de Harry, que agora procura um objeto lendário conhecido como a pedra filosofal.",
    img: HPCover,
    preview: HPPreview
  },
  {
    id: 2,
    title: "Harry Potter 2",
    author: "J.K Rowling",
    price: 14.89,
    genre: "Aventura",
    availableQtd: "7",
    soldQtd: "2",
    description: "Depois de férias aborrecidas na casa dos tios trouxas, está na hora de Harry Potter voltar a estudar. Coisas acontecem, no entanto, para dificultar o regresso de Harry. Persistente e astuto, o herói não se deixa intimidar pelos obstáculos e, com a ajuda dos fiéis amigos Weasley, começa o ano letivo na Escola de Magia e Bruxaria de Hogwarts. As novidades não são poucas. Novos colegas, novos professores, muitas e boas descobertas e um grande e perigosos desafio. Alguém ou alguma coisa ameaça a segurança e a tranquilidade dos membros de Hogwarts.",
    img: HPCover2,
    preview: HPPreview
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
      img: CoverMockup,
      preview: PreviewMockup
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

export function getBook(filter) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      callsCounter = (callsCounter + 1) % 5;
      if (callsCounter === 0) {
        reject();
      } else {
        const index = books.find((book) => filter === book.id)
        resolve(
          index
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
