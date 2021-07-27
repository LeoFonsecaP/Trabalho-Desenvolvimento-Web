import { useState, useCallback, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { UserPermissions, Permissions } from "../../Contexts/userPermissions";
import AddressSubForm from "../AddressSubForm";

function PasswordWithConfirmationField({ id, name, onChange, value }) {
  const [confiramtion, setConfirmation] = useState("");

  const handleInputChange = useCallback(
    (event) => {
      if (value !== event.target.value) {
        event.target.setCustomValidity("As senhas não coincidem");
      } else {
        event.target.setCustomValidity("");
      }
      setConfirmation(event.target.value);
    },
    [value]
  );

  return (
    <>
      <label htmlFor={id}>Senha</label>
      <input
        type="password"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id}>Confirmação da password</label>
      <input
        type="password"
        id="confirmation"
        name="confirmation"
        value={confiramtion}
        onChange={handleInputChange}
        required
      />
    </>
  );
}

function CreateAccountForm() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    address: {},
    isAdmin: false,
  });

  const history = useHistory();
  const { setUserPermissions } = useContext(UserPermissions);

  const handleInputChange = useCallback((event) => {
    event.target.setCustomValidity("");
    setSignUpData((signUpData) => ({
      ...signUpData,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const setAddressData = useCallback((address) => {
    setSignUpData((signUpData) => ({ ...signUpData, address }));
  }, []);

  const submit = useCallback(
    (event) => {
      event.preventDefault();
      const configs = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({
          name: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          isAdmin: signUpData.isAdmin,
          ...signUpData.address,
        }),
      };
      fetch("/api/users", configs)
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            if (data.isAdmin) {
              setUserPermissions(Permissions.ADMIN);
            } else {
              setUserPermissions(Permissions.USER);
            }
          }
          history.goBack();
        })
        .catch((reason) => {
          event.target["email"].setCustomValidity(reason);
        });
    },
    [signUpData, history, setUserPermissions]
  );

  return (
    <form className="folded-box" onSubmit={submit}>
      <h3 className="folded-titulo">Login</h3>
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        id="name"
        name="name"
        value={signUpData.name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={signUpData.email}
        onChange={handleInputChange}
        required
      />
      <PasswordWithConfirmationField
        id="password"
        name="password"
        value={signUpData.password}
        onChange={handleInputChange}
      />
      <AddressSubForm setAddress={setAddressData} />
      <input type="submit" value="Entrar" className="btn-principal" />
    </form>
  );
}

export default withRouter(CreateAccountForm);
