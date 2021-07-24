import React, { useContext, useEffect, useState } from "react";
import ItemCart from "../../Components/ItemCart";
import { Link } from "react-router-dom";
import cartContext from "../../Contexts/cart";

function Cart() {
  const { itensCart, addItem, removeItem } = useContext(cartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    if (itensCart) {
      for (const item of itensCart) {
        sum += Number(item.price) * item.qtdWanted;
      }
    }
    setTotalPrice(sum);
  }, [itensCart]);

  const changeQtd = (curItem, action) => {
    if (action === "add") {
      if (curItem.qtdWanted < curItem.availableQuantity) {
        addItem(curItem);
      } else {
        alert("Quantidade em estoque atingida!");
      }
    } else {
      removeItem(curItem);
    }
  };

  const deleteItem = (curItem) => {
    removeItem(curItem, true);
  };

  return (
    <div className="container">
      <h1>Meu Carrinho</h1>

      <div className="card minheight">
        <>
          <h2>Itens no carrinho</h2>
          {itensCart &&
            itensCart.map((item) => {
              return (
                <ItemCart
                  key={item.id}
                  item={item}
                  changeQtd={changeQtd}
                  deleteItem={deleteItem}
                />
              );
            })}

          <div className="text-right">
            <span style={{ marginRight: 20 }}>
              TOTAL: R$ {Number(totalPrice).toFixed(2)}
            </span>
            {itensCart.length > 0 && (
              <Link to="/checkout">
                <button id="buyBtn">Efetuar compra</button>
              </Link>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default Cart;
