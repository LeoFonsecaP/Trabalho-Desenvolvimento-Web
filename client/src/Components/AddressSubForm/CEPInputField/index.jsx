import { useCallback } from 'react';

function formatCepString(cep) {
  const parsed = parseFormatedCepString(cep);
  const clippedLen = Math.min(parsed.length, 5);
  const firstSegment = parsed.slice(0, clippedLen);
  const secondSegment = parsed.slice(clippedLen);
  return `${firstSegment}${cep.length > 5 ? "-" : ""}${secondSegment}`;
}

function isNumeric(str) {
  return !isNaN(str);
}

function parseFormatedCepString(cepString) {
  return cepString.split("").filter(isNumeric).join("").slice(0, 8);
}

const CEP_PATTERN = "[0-9]{5}-[0-9]{3}";

function CepInputField ({
  id,
  name,
  onChange,
  value,
  onIsValid
}){
  const handleInputChange = useCallback((event) => {
    const isValid = (new RegExp(CEP_PATTERN)).test(event.target.value);
    const copy = {...event};
    copy.target.value = parseFormatedCepString(event.target.value);
    onChange(copy);
    if (isValid) {
      onIsValid(copy);
    }
  }, [onChange, onIsValid])
  
  return (
    <div>
      <label htmlFor={id}>CEP</label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder="xxxxx-xxx"
        value={formatCepString(value)}
        onChange={handleInputChange}
        pattern={"[0-9]{5}-[0-9]{3}"}
      />
    </div>
  );
}

export default CepInputField;
