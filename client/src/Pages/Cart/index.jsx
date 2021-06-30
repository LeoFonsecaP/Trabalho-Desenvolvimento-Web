import React, { useEffect, useState } from "react";
import ItemCart from "../../Components/ItemCart";
import { Link } from 'react-router-dom';


function Cart() {
  const [itensCart, setItensCart] = useState(localStorage.getItem("itensCart"));
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // simulate that there is some itens saved on the storage
    setItensCart([
      { id: 1, name: "harry potter", price: 20.2, qtdWanted: 2, stock: 10 },
      { id: 2, name: "harry potter 2", price: 18.99, qtdWanted: 3, stock: 20 },
      { id: 3, name: "senhor dos aneis", price: 15.5, qtdWanted: 2, stock: 5 },
    ]);
  }, []);

  useEffect(() => {
    let sum = 0;
    if (itensCart) {
      for (const item of itensCart) {
        sum += item.price * item.qtdWanted;
      }
    }
    setTotalPrice(sum);
  }, [itensCart]);

  const changeQtd = (curItem, action) => {
    const add_subtract = action === "add" ? 1 : -1;
    const newItens = itensCart.map((item) => {
      if (item.id === curItem.id)
        return {
          ...item,
          qtdWanted: Math.min(
            Math.max(item.qtdWanted + add_subtract, 1),
            item.stock
          ), // limit stock and positive itens
        };
      return item;
    });
    setItensCart(newItens);
  };

  const deleteItem = (curItem) => {
    const newItens = itensCart.filter((item) => {
      return item.id !== curItem.id;
    });
    setItensCart(newItens);
  };

  return (
    <div className="container">
      <h1>Meu Carrinho</h1>

      <div className="card">
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
                TOTAL: R$ {totalPrice.toFixed(2)}
              </span>
              <Link to="/checkout">
                <button id="buyBtn">
                  Efetuar compra
                </button>           
              </Link>
            </div>
          </>
      </div>
    </div>
  );
}

export default Cart;
