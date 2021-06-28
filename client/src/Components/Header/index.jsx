import {Link} from 'react-router-dom'

function Header() {
  return (
    <header>
      <div className="container flex-box">
        <div id="logo">
          <Link to="/"><h1>Mundo das Letras</h1></Link>
        </div>
        <nav>
          <ul>
            <li>
            <Link to="/login"><h1>Entrar/Criar conta</h1></Link>
            </li>
            <li>
            <Link to="/carrinho">
              <i className="fa fa-shopping-cart"></i>
            </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
