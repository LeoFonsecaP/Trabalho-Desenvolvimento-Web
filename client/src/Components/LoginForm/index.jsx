import { useState, useCallback, useContext } from "react";
import { useHistory, withRouter } from 'react-router-dom';
import { UserPermissions, Permissions } from '../../Contexts/userPermissions';

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

  const submit = useCallback(async (event) => {
    event.preventDefault();
    try {
      const configs = {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        credentials: 'include',
        body: JSON.stringify(loginData)
      };
      const response = await fetch('http://127.0.0.1:3333/api/auth', configs);
      const data = await response.json();
      console.log(data);
      if (data.authenticated) {
        setUserPermissions(data.isAdmin ? Permissions.ADMIN : Permissions.USER);
        history.goBack();
      }
    } catch (error) {
      event.target[0].setCustomValidity(error);
    }
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
