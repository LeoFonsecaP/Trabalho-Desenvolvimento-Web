import { useState, useCallback, useContext } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import { UserPermissions } from '../../Contexts/userPermissions';
import { loginUser } from '../../Mock/authentication'

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const { setUserPermissions } = useContext(UserPermissions);
  const history = useHistory();
  

  const handleInputChange = useCallback((event) => {
    event.target.setCustomValidity("");
    setLoginData({...loginData, [event.target.name]: event.target.value})
  }, [loginData]);

  const submit = useCallback((event) => {
    event.preventDefault();
    loginUser(loginData)
      .then((permissions) => {
        setUserPermissions(permissions);
        history.goBack();
      }).catch((reason) => {
        event.target[0].setCustomValidity(reason);
      });
  }, [history, setUserPermissions, loginData]);

  return (
    <form className="folded-box" onSubmit={submit}>
      <h3 className="folded-titulo">
        Login
      </h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={loginData.email}
        onChange={handleInputChange}
        required={true}
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        required={true}
      />
      <input
        type="submit"
        value="Entrar"
        className="btn-principal"
      />
    </form>
  );
}

export default withRouter(LoginForm);
