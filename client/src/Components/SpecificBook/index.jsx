import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import cartContext from "../../Contexts/cart";

function GetSpecificBook({ id }) {
  const [ShowPreview, SetPreview] = useState(false);
  const [Book, setBook] = useState([]);
  const [LoadingBooks, setLoadingBooks] = useState(false);

  const { addItem } = useContext(cartContext);

  useEffect(() => {
    (async () => {
      const uri = `http://127.0.0.1:3333/api/books/${id}`;
      setLoadingBooks(true);
      try {
        const response = await fetch(uri);
        const data = await response.json();
        setBook(data);
        setLoadingBooks(false);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [id]);

  if (LoadingBooks) {
    return (
      <div className="text-center">
        <h1>Erro ao carregar o livro...</h1>
        <Link to="/home">
          <button id="buyBtn">Voltar</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="card minheight">
          <div className="flex-box flex-box-wrap">
            <img
              src={Book.img}
              alt={"Falha ao carregar imagem."}
              className="img-livro"
            />
            <div className="info-livro">
              <h1>{Book.title}</h1>
              <h3>{Book.author}</h3>
              <h3>{Book.genre}</h3>
              <p>{Book.description}</p>
            </div>
            <div className="pagamento">
              <h2>Vendidos: {Book.soldQtd}</h2>
              <h2>Em estoque: {Book.availableQtd}</h2>
              <h1>R$ {Book.price}</h1>
              <button
                className="btn-principal"
                onClick={() => SetPreview(!ShowPreview)}
              >
                Preview
              </button>
              <button
                className="btn-principal"
                onClick={() => {
                  addItem(Book);
                  alert(
                    "Uma unidade deste livro foi adicionada ao seu carrinho!"
                  );
                }}
              >
                COMPRAR
              </button>
            </div>
          </div>
          {ShowPreview && (
            <div className="folded-box text-center preview">
              <img
                src={Book.preview}
                alt={"Falha ao carregar imagem."}
                className="preview"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GetSpecificBook;
