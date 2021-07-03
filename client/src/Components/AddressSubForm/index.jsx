import { useState, useEffect, useCallback } from 'react';
import CepInputField from './CEPInputField';
import StateInputField from './StateInputFiled';
import CountyInputField from './CountyInputFiled';

function AddressSubForm ({ setAddress }) {
  const [addressValues, setAddressValues] = useState({
    county: "",
    state: "",
    cep: "",
    neighbourhood: "",
    street: "",
    number: "",
    complement: "",
  });

  const fetchAddressInfoFromCep = useCallback((event) => {
    fetch(`https://viacep.com.br/ws/${event.target.value}/json/`)
      .then((response) => response.json())
      .then((address) => {
        if (typeof address.erro === "undefined" || !address.erro) {
          setAddressValues((addressValues) => ({
            ...addressValues,
            cep: address.cep,
            county: address.localidade,
            state: address.uf,
            neighbourhood: address.bairro,
            street: address.logradouro 
          }));
        }
      }).catch((reason) => {
        console.error(reason);
      })
  }, []);

  const handleInputChange = useCallback((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddressValues((addressValues) => ({...addressValues, [name]: value}));
  }, [])

  useEffect(() => {
    setAddress(addressValues);
  }, [addressValues, setAddress]);

  return (
    <>
      <CepInputField
        id="cep"
        name="cep"
        onChange={handleInputChange}
        value={addressValues.cep}
        onIsValid={fetchAddressInfoFromCep}
      />
      <StateInputField
        id="state"
        name="state"
        onChange={handleInputChange}
        value={addressValues.state}
      />
      <CountyInputField
        id="county"
        name="county"
        state={addressValues.state}
        onChange={handleInputChange}
        value={addressValues.county}
      />
      <label htmlFor="street">Logradouro</label>
      <input
        id="street"
        name="street"
        type="text"
        onChange={handleInputChange}
        value={addressValues.street}
      />
      <label htmlFor="number">Número</label>
      <input
        id="number"
        name="number"
        type="text"
        onChange={handleInputChange}
        value={addressValues.number}
        required
      />
      <label htmlFor="complement">Complemento</label>
      <input
        id="complement"
        name="complement"
        type="text"
        onChange={handleInputChange}
        value={addressValues.complement}
      />
    </>
  );
}

export default AddressSubForm;
