import LoginForm from "../../Components/LoginForm"
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <div className="card">
        <LoginForm/>
        <Link name={"signup"} to={"/signup"} replace={true}>
          <p>Criar uma conta.</p>
        </Link>
      </div>
    </div>
  )
}

export default Login;
