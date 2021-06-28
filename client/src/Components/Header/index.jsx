import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="container flex-box">
        <div id="logo">
          <h1>Mundo das Letras</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="./login.html">Entrar/Criar conta</a>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span className="qtdItensCart">3</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
