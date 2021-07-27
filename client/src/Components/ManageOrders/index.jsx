import React, { useEffect, useState } from "react";
import OrderTable from "./Table";

function ManageOrders() {
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoadingOrders(true);
        const response = await fetch("/api/orders");
        const data = await response.json();
        console.log(data);
        setOrders(data);
        setLoadingOrders(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="card">
      <h2>Gerenciar pedidos do sistema</h2>

      <OrderTable orders={orders} loading={loadingOrders} />
    </div>
  );
}

export default ManageOrders;
