import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://servicodados.ibge.gov.br/api/";

function getApiEndpoint(value) {
  return `${API_BASE_URL}v1/localidades/estados/${value}/municipios`
}

function stateWasReceived(state) {
  return typeof state !== "undefined" && state !== "";
}

function CountyInputField({
  state,
  id,
  name,
  onChange,
  value,
}) {
  const [countiesList, setCountiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function fetchCounties() {
      if (stateWasReceived(state)) {
        setIsLoading(true);
        fetch(getApiEndpoint(state))
          .then((response) => response.json())
          .then((counties) => counties.map(({ nome }) => nome ))
          .then((counties) => {
            setCountiesList(counties);
            setIsLoading(false);
          }).catch(() =>{
            setTimeout(fetchCounties, 1000);
        });
      }
    }
    fetchCounties();
  }, [state]);

  const setErrorMessage = useCallback((event) => {
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity(
        `Por favor insira um município válido para o estado fornecido.`
      );
    }
  }, []);

  return (
    <>
      <label htmlFor={id}>Município</label>
      <input
        id={id}
        name={name}
        type="text"
        onChange={onChange}
        value={isLoading? "Carregando..." : value}
        onInvalid={setErrorMessage}
        pattern={countiesList.join("|")}
        list="counties"
        readOnly={!stateWasReceived(state) || isLoading}
        required
      />
      <datalist id="counties" name="counties">
        {countiesList.map((value, index) => (
          <option key={index} value={value}></option>
        ))}
      </datalist>
    </>
  )
}

export default CountyInputField;
