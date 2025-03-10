import React, { useEffect, useState } from "react";
import axios from "axios";
import "../asset/css/OrderReport.css"; // นำเข้าไฟล์ CSS

const ReportTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/reports")
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="order-report-container">
      <h2 className="report-title">📊 Order Report</h2>
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Order ID</th>
              <th>Status</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.user.username}</td>
                <td>{order.user.email}</td>
                <td className="order-id">{order.id}</td>
                <td className={`status ${order.status === "pending" ? "pending" : "completed"}`}>
                  {order.status}
                </td>
                <td>{order.product.productname}</td>
                <td>{order.product?.Category?.Categoryname || "No Category"}</td>
                <td className="center">{order.quantity}</td>
                <td className="price">฿{order.unitprice}</td>
                <td className="discount">{order.discount_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
