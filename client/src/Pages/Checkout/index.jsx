import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../Contexts/cart";
import ItemCheckout from "../../Components/itemCheckout";
import AddressSubForm from "../../Components/AddressSubForm";

function Checkout() {
  const [finishOrder, setFinishOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { itensCart, clearCart } = useContext(cartContext);
  const [showError, setShowError] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    address: {},
    cardname: "",
    cardnumber: "",
    cardmonth: "",
    cardyear: "",
    cvv: "",
    shipping: "",
  });

  const setAddressData = useCallback((address) => {
    setCheckoutData((checkoutData) => ({ ...checkoutData, address }));
  }, []);

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
    if (
      checkoutData.address &&
      checkoutData.cardname &&
      checkoutData.cardnumber &&
      checkoutData.cardmonth &&
      checkoutData.cardyear &&
      checkoutData.cvv
    ) {
      const time = new Date();
      const order_time =
        time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear();
      const configs = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "include",
        body: JSON.stringify({
          cardname: checkoutData.cardname,
          cardnumber: checkoutData.cardnumber,
          cardmonth: checkoutData.cardmonth,
          cardyear: checkoutData.cardyear,
          cvv: checkoutData.cvv,
          shipping: checkoutData.shipping,
          status: "Confirmada",
          orderTime: order_time,
          itens: itensCart.map((item) => item._id),
          ...checkoutData.address,
        }),
      };
      fetch("http://127.0.0.1:3333/api/orders", configs);
      setShowError(false);
      setFinishOrder(true);
      clearCart();
    } else {
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
            <div className="form-col">
              <h2>Informações</h2>
              <form className="folded-box">
                <AddressSubForm setAddress={setAddressData} />
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

                <select
                  className="sel"
                  name="cardmonth"
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected hidden>
                    Mês
                  </option>
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
            <div className="form-col">
              <h2>Resumo da compra</h2>
              {itensCart &&
                itensCart.map((item) => {
                  return <ItemCheckout item={item} />;
                })}
              <span className="price">
                <h3>TOTAL: R$ {Number(totalPrice).toFixed(2)}</h3>
              </span>
              <div className="text-right">
                <Link to="/cart">
                  <button className="btn-principal">Editar</button>
                </Link>
                <button className="btn-principal" onClick={submit}>
                  Finalizar
                </button>
              </div>
            </div>
            {showError && (
              <p className="error">Preencha os campos obrigatórios</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-center minheight">
            <h2>
              Compra realizada com sucesso! <br></br>
              Obrigado por comprar com a Mundo das Letras
            </h2>
            <Link to="/home">
              <button id="buyBtn">Voltar</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
