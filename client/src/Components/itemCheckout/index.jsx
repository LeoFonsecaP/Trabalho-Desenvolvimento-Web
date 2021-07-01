function ItemCheckout({ item, qtd }) {
	return (
	  <div className="itemCheckout">
		<div className="itemqtd">{item.qtdWanted}</div>
		<div className="itemName">{item.title}</div>
		<div className="itemBtns">
		  <div className="itemPrice" style={{ marginRight: 20 }}>
			R$ {(Number(item.price) * item.qtdWanted).toFixed(2)}
		  </div>
		</div>
	  </div>
	);
  }
  
  export default ItemCheckout;
  