import { getBook } from "../../Mock/getBooks";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function GetSpecificBook(id){

	const [ShowPreview, SetPreview] = useState(false);
	const [Book, setBook] = useState([]);
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
					<img src={Book.img} alt={"Falha ao carregar imagem." }className="img-livro"/>
						<div className="info-livro">
							<h1>{Book.title}</h1>
							<h3>{Book.author}</h3>
							<h3>{Book.genre}</h3>
							<p>{Book.description}</p>
						</div>
						<div className="pagamento">
							<h2>Vendidos:   {Book.soldQtd}</h2>
							<h2>Em estoque: {Book.availableQtd}</h2>
							<h1>U$ {Book.price}</h1>
							<button className="btn-principal" onClick={() => SetPreview(!ShowPreview) }>Preview</button>
							<Link to="/cart"><button className="btn-principal">COMPRAR</button></Link>
						</div>
					</div>
					{ShowPreview &&
					<div className="folded-box text-center preview">
							<img src={Book.preview} alt={"Falha ao carregar imagem." }className="preview"/>
	  			  	</div>
					}
				</div>
		</div>
	)}

}


export default GetSpecificBook;