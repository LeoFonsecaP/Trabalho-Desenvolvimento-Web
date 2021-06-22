function Header() {
  return (
    <header>
      <div class="container flex-box">
        <div id="logo">
          <h1>Mundo das Letras</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="./login.html">Entrar/Criar conta</a>
            </li>
            <li>
              <a href="./carrinho.html">
                <i class="fa fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
