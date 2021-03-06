import { useContext } from "react";
import { Link } from "react-router-dom";
import PrivateContent from "../PrivateContent";
import { logoffUser } from "../../Mock/authentication";
import cartContext from "../../Contexts/cart";
import { UserPermissions, Permissions } from "../../Contexts/userPermissions";

function Header() {
  const { numberOfItens } = useContext(cartContext);
  const { setUserPermissions } = useContext(UserPermissions);

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
            <PrivateContent
              requiredPermissions={[Permissions.GUEST]}
            >
              <li>
                <Link to="/login"><h1>Entrar/Criar conta</h1></Link>
              </li>
            </PrivateContent>
            <PrivateContent
              requiredPermissions={[Permissions.USER, Permissions.ADMIN]}
            >
              <li>
                <button
                  onClick={() => logoffUser().then(setUserPermissions)}
                >
                  Sair
                </button>
              </li>
            </PrivateContent>
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
