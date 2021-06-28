import BooksFilterableList from '../../Components/BooksPreview'

function Home() {
  return (
    <div class="container">
      <h1>Seja bem vindo ao Mundo das Letras!</h1>
      <div class="banner">
        <div class="card">
          <h2>Por que comprar no nosso site?</h2>
          <p>
          Aqui no Mundo das Letras você pode encontrar livros de todos os tipos
          para satisfazer os seus interesses. Oferecemos bons preços e um
          mecanismo muito interessante de preview gratuito. Confira os nossos
          produtos abaixo.
        </p>
        </div>
      </div>
      <div class="card">
        <BooksFilterableList/>
      </div>
    </div>
  );
}

export default Home;
