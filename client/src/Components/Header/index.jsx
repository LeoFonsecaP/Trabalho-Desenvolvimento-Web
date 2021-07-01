import { useContext } from "react";
import { Link } from "react-router-dom";

import cartContext from "../../Contexts/cart";

function Header() {
  const { numberOfItens } = useContext(cartContext);

  return (
    <header>
      <div className="container flex-box">
        <div id="logo">
          <Link to="/">
            <h1>Mundo das Letras</h1>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/login">
                <h1>Entrar/Criar conta</h1>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span className="qtdItensCart">{numberOfItens}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
