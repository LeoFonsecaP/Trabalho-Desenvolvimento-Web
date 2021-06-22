import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div class="container flex-box">
        <Link to="/admin">Página de administrador</Link>
      </div>
    </footer>
  );
}

export default Footer;
