function ItemCart({ item, changeQtd, deleteItem }) {
  return (
    <div className="itemCart">
      <div className="itemName">{item.title}</div>
      <div className="itemBtns">
        <div className="itemPrice" style={{ marginRight: 20 }}>
          R$ {Number(item.price).toFixed(2)}
        </div>
        <i
          className="fa fa-minus itemBtn"
          onClick={() => {
            changeQtd(item, "subtract");
          }}
        ></i>
        <input
          disabled
          value={item.qtdWanted}
          type="number"
          className="itemInput"
        />
        <i
          className="fa fa-plus itemBtn"
          onClick={() => {
            changeQtd(item, "add");
          }}
        ></i>
        <i
          className="fa fa-trash itemBtn"
          style={{ marginLeft: 20 }}
          onClick={() => deleteItem(item)}
        ></i>
      </div>
    </div>
  );
}

export default ItemCart;
