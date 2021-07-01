import { useState, useCallback } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import {
  useUserPermissionsChangeSignalRaiser,
} from '../../Authentication/UserPermissions';
import { loginUser } from '../../Mock/authentication'

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const raiseSignal = useUserPermissionsChangeSignalRaiser();
  

  const handleInputChange = useCallback((event) => {
    event.target.setCustomValidity("");
    setLoginData({...loginData, [event.target.name]: event.target.value})
  });

  const submit = useCallback((event) => {
    event.preventDefault();
    loginUser(loginData)
      .then(() => {
        raiseSignal();
        setRedirect(true);
      }).catch((reason) => {
        event.target[0].setCustomValidity(reason);
      });
  });

  if (redirect) {
    history.goBack();
  }

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
