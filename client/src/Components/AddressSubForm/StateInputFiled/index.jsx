import { useState, useEffect, useCallback } from "react";

const API_ENDPOINT = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

function StateInputField({
  id,
  name,
  onChange,
  value,
}) {
  const [statesList, setStatesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStates = useCallback(() => {
    setIsLoading(true);
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((states) => states.map(({ sigla, nome }) => ({
        initials: sigla,
        name: nome 
      }))).then((states) => {
        setStatesList(states);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
        setTimeout(fetchStates, 1000);
      });
  }, [])

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <div>
      <label htmlFor="state">Estado</label>
      <select
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        required
      >
        <option value="" defaultValue disabled>
          {isLoading ? "Carregando..." : "Escolha um estado."}
        </option>
        {statesList.map((state, index) => (
          <option key={index} value={state.initials}>{state.name}</option>
        ))}
      </select>
    </div>
  )
}

export default StateInputField;
