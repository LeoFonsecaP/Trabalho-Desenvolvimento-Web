import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Checkout() {

  const [finishOrder, setFinishOrder] = useState(false);


  return (
    <div className="container">
        {!finishOrder ? (
          <>
          <div className="form-2-sides">
            <div className="form-left">
              <h2>Informações</h2>
            <form className = "checkout">
                  <input type="text" id="name"  placeholder="Nome Completo"></input>
                  <input type="text" id="email" name="email" placeholder="email@exemplo.com"></input>
                  <input type="text" id="adress" placeholder="Endereço"></input>
                  <input type="text" id="city" className="mip" placeholder="Cidade"></input>
                  <select className="sel">
                    <option value="" disabled selected hidden>Estado</option>
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
                  <input type="text" id="zip" name="zip" placeholder="CEP" className="sip"></input>
                </form>
            </div>

            <div className="form-right">
            <form className="checkout">
              <h2>Pagamento</h2>
                <input type="text" id="cname" name="cardname" placeholder="Card name"></input>
                <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"></input>
                <select className="sel">
                  <option value="" disabled selected hidden>Mês</option>
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
                <input type="text" id="expyear" className="sip" name="expyear" placeholder="Ano"></input>
                <input type="text" id="cvv" className="sip" name="cvv" placeholder="CVV"></input>
                <br></br>
                <label>
                  <input type="checkbox" checked="checked" name="sameadr"></input>
                  &nbsp;Shipping address same as billing
                </label>
            </form>
            </div>
          </div>
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
