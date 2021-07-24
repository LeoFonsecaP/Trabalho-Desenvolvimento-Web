import React from "react";

function OrderTable({ orders, loading }) {
  return (
    <div className="wrapperTable">
      <table id="orders">
      <thead>
          <tr>
            <th>Usuário</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>CEP</th>
            <th>Bairro</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Complemento</th>
            <th>Status</th>
            <th>Data de compra</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.email}</td>
                <td>{order.county}</td>
                <td>{order.state}</td>
                <td>{order.cep}</td>
                <td>{order.neighbourhood}</td>
                <td>{order.street}</td>
                <td>{order.number}</td>
                <td>{order.complement}</td>
                <td>{order.status}</td>
                <td>{order.orderTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {loading && "Carregando..."}
    </div>
  );
}

export default OrderTable;
