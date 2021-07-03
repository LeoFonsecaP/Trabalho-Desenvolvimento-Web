import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import cartContext from "../../Contexts/cart";
import ItemCheckout from "../../Components/itemCheckout";


function Checkout() {

  const [finishOrder, setFinishOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { itensCart, clearCart } = useContext(cartContext);
  const [showError, setShowError] = useState(false);


  const [checkoutData, setCheckoutData] = useState({
    name: "",
    address: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    cardname: "",
    cardnumber: "",
    cardmonth: "",
    cardyear: "",
    cvv: "",
    shipping: "",


  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setCheckoutData({
      ...checkoutData,
      [name]: value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    // validate data
    if (checkoutData.name &&
        checkoutData.address &&
        checkoutData.city &&
        checkoutData.state &&
        checkoutData.email &&
        checkoutData.zip && 
        checkoutData.cardname && 
        checkoutData.cardnumber && 
        checkoutData.cardmonth && 
        checkoutData.cardyear){
          setShowError(false);
          setFinishOrder(true);
          clearCart();
        }
      else {
      setShowError(true);
    }
  };


  useEffect(() => {
    let sum = 0;
    if (itensCart) {
      for (const item of itensCart) {
        sum += Number(item.price) * item.qtdWanted;
      }
    }
    setTotalPrice(sum);
  }, [itensCart]);

  return (
    <div className="container">
        {!finishOrder ? (
          <>
          <div className="form-3-sides">
            <div className="form-left">
              <h2>Informações</h2>
            <form className = "checkout">
                  <input 
                  type="text" 
                  name="name"  
                  placeholder="Nome Completo"
                  onChange={handleInputChange}
                  ></input>

                  <input 
                  type="text"
                  name="email"
                  placeholder="email@exemplo.com"
                  onChange={handleInputChange}
                  ></input>

                  <input 
                  type="text" 
                  name="address" 
                  placeholder="Endereço"
                  onChange={handleInputChange}
                  ></input>

                  <input 
                  type="text" 
                  name="city" 
                  className="mip" 
                  placeholder="Cidade"
                  onChange={handleInputChange}
                  ></input>

                  <select name="state" className="sel" onChange={handleInputChange}>
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

                  <input 
                  type="text" 
                  name="zip" 
                  placeholder="CEP" 
                  className="sip"
                  onChange={handleInputChange}
                  ></input>
                </form>
            </div>

            <div className="form-center">
              <form className="checkout">
                <h2>Pagamento</h2>
                  <input 
                  type="text" 
                  id="cname" 
                  name="cardname" 
                  placeholder="Card name"
                  onChange={handleInputChange}
                  ></input>

                  <input 
                  type="text" 
                  id="ccnum" 
                  name="cardnumber" 
                  placeholder="1111-2222-3333-4444"
                  onChange={handleInputChange}
                  ></input>

                  <select className="sel" name="cardmonth" onChange={handleInputChange}>
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

                  <input 
                  type="text" 
                  id="expyear" 
                  className="sip" 
                  name="cardyear" 
                  placeholder="Ano"
                  onChange={handleInputChange}
                  ></input>

                  <input 
                  type="text" 
                  id="cvv" 
                  className="sip" 
                  name="cvv" 
                  placeholder="CVV"
                  onChange={handleInputChange}
                  ></input>

                  <br></br>
                  <label>
                    <input 
                    type="checkbox" 
                    name="shipping"
                    onChange={handleInputChange}
                    ></input>

                    &nbsp;Shipping address same as billing
                  </label>
              </form>
            </div>
            <div className="form-right">
              <h2>Resumo da compra</h2>
                {itensCart &&
                itensCart.map((item) => {
                return (
                  <ItemCheckout
                    item={item}
                  />
                );
              })}
              <span className="price">
                <h3>TOTAL: R$ {Number(totalPrice).toFixed(2)}</h3>
              </span>
              <div className = "text-right">
                <Link to="/cart">
                  <button className="btn-principal">
                    Editar
                  </button> 
                </Link>
                <button className="btn-principal" onClick={submit}>
                  Finalizar
                </button>
              </div>
            </div>
              {showError && <p className="error">Preencha os campos obrigatórios</p>}
          </div>
          </>
        ) : (
          <>
          <div className="text-center minheight">
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
