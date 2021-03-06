import { createContext, useState, useEffect } from "react";

const cartContext = createContext({ numberOfItens: 0 });

export const CartProvider = ({ children }) => {
  const [numberOfItens, setNumberOfItens] = useState(0);
  const [itensCart, setItensCard] = useState(
    JSON.parse(localStorage.getItem("itensCart")) || []
  );

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("itensCart"));
    setNumberOfItens(!itens ? 0 : itens.length);
  }, []);

  const addItem = (item) => {
    let itens = itensCart;

    let found = false;
    itens = itens.map((curItem) => {
      if (curItem._id === item._id) {
        found = true;
        return { ...curItem, qtdWanted: curItem.qtdWanted + 1 };
      }
      return curItem;
    });

    if (!found) {
      itens = [{ ...item, qtdWanted: 1 }, ...itens];
    }

    localStorage.setItem("itensCart", JSON.stringify(itens));
    setItensCard(itens);
    setNumberOfItens(itens.length);
  };

  const clearCart = () => {
    localStorage.clear();
    setItensCard([]);
    setNumberOfItens(0);
  };

  const removeItem = (item, allOfThem = false) => {
    let found = false;
    let itens = itensCart.map((curItem) => {
      if (curItem._id === item._id && curItem.qtdWanted > 1) {
        found = true;
        return {
          ...curItem,
          qtdWanted: curItem.qtdWanted - 1,
        };
      }
      return curItem;
    });

    if (!found || allOfThem) {
      itens = itensCart.filter((curItem) => {
        return curItem._id !== item._id;
      });
    }
    localStorage.setItem("itensCart", JSON.stringify(itens));
    setItensCard(itens);
    setNumberOfItens(itens.length);
  };

  return (
    <cartContext.Provider
      value={{
        numberOfItens,
        itensCart,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;
