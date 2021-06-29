import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Checkout() {

  const [finishOrder, setFinishOrder] = useState(false);


  return (
    <div className="container">
        {!finishOrder ? (
          <>
          <form>
              <input type="text" id="name" placeholder="Nome Completo"></input>
              <input type="text" id="email" name="email" placeholder="email@exemplo.com"></input>
              <input type="text" id="adress" placeholder="Endereço"></input>
              <input type="text" id="city" placeholder="Cidade"></input>
              <select id="state">
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                  <option value="EX">Estrangeiro</option>
              </select>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" id="zip" name="zip" placeholder="CEP"></input>
              <input type="tel" id="phone" placeholder=" ()00000-0000"></input>

              <input type="text" id="cname" name="cardname" placeholder="Card name"></input>
              <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"></input>
              <select id="state">
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                  <option value="4">Abril</option>
                  <option value="5">Maio</option>
                  <option value="6">Junho</option>
                  <option value="7">Julho</option>
                  <option value="8">Agosto</option>
                  <option value="9">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
              </select>
              <input type="text" id="expyear" name="expyear" placeholder="Ano"></input>
              <input type="text" id="cvv" name="cvv" placeholder="CVV"></input>
              <label>
                <input type="checkbox" checked="checked" name="sameadr"></input>
                &nbsp;Shipping address same as billing
              </label>
          </form>
          <div className = "text-right">
              <button id="buyBtn" onClick={() => setFinishOrder(true)}>
                Finalizar
              </button>
          </div>
          </>
        ) : (
          <>
          <div className="text-center">
            <h2>Compra realizada com sucesso!  <br></br>
              Obrigado por comprar com a Mundo das Letras</h2>
              <Link to="/home">
              <button id="buyBtn">
                Voltar
              </button> 
              </Link>
          </div>
          </>
        )}
    </div>
  );
}

export default Checkout;
