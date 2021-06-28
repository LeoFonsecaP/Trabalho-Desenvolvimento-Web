import { getBook } from "../../Mock/getBooks";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function GetSpecificBook(id){

	const [ShowPreview, SetPreview] = useState(false);
	const [book, setBook] = useState([]);
	const [LoadingBooks, setLoadingBooks] = useState(false);
	
	useEffect(() => {
	  async function fetchBooks() {
		setLoadingBooks(true);
		const response = await getBook(id);
		setBook(response);
		setLoadingBooks(false);
	  }
	  fetchBooks();
	}, [id]);

	if(LoadingBooks){
		return(
			<h1>Carregando livro...</h1>
		)
	}
	else{
		return(
			<div className="container">
				<div className="card">
					<div className="flex-box flex-box-wrap">
					<img src={book.img} alt={"Falha ao carregar imagem." }className="img-livro"/>
						<div className="info-livro">
							<h1>{book.title}</h1>
							<h3>{book.author}</h3>
							<h3>{book.genre}</h3>
							<p>{book.description}</p>
						</div>
						<div className="pagamento">
							<h2>Vendidos:   {book.soldQtd}</h2>
							<h2>Em estoque: {book.availableQtd}</h2>
							<h1>U$ {book.price}</h1>
							<button className="btn-principal" onClick={() => SetPreview(!ShowPreview) }>Preview</button>
							<Link to="/cart"><button className="btn-principal">COMPRAR</button></Link>
						</div>
					</div>
					{ShowPreview &&
					<div className="folded-box text-center preview">
							<img src={book.preview} alt={"Falha ao carregar imagem." }className="preview"/>
	  			  	</div>
					}
				</div>
		</div>
	)}

}


export default GetSpecificBook;