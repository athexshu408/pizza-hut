import React, { useState ,useContext} from "react";
import "./order.css";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {Context} from "../context/Context"

const Order = () => {
  const { user} = useContext(Context);

  
  const [orderslip,setOrderSlip]=useState()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get("reference");
     console.log( reference)
  const statusClass = (index) => {
    if (index - status < 1) return "done";
    if (index - status === 1) return "processing";
    if (index - status > 1) return "undone";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (reference) {
          const res = await axios.get(
            `http://localhost:5000/api/orders/order/`+ reference
          );
          console.log("Data fetched successfully:", res.data);
          setOrderSlip(res.data);
          console.log(res.data);
        } else {
          console.log("No reference found in URL.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [reference]);
  const status = orderslip?.status;

  console.log(user.username)

  return (
    <div className="orderContainer">
      <div className="orderLeft">
        <div className="orderRow">
        <table className="orderTable">
          <thead>

          <tr className="cartTr">
            <th>Order ID</th>
            <th>Customer</th>
            <th>Address</th>

            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span className="orderId">{orderslip?.order_id}</span>
            </td>
            <td>
              <span className="oderCustomer">{user.username}</span>
            </td>
            <td>
              <span className="orderAddress">{user.address}</span>
            </td>

            <td>
              <span className="orderTotal">&#8377;{orderslip?.amount}</span>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
        <div className="orderRow">
          <div className={statusClass(0)}>
            <img src="/img/paid.png" alt="" />
            <span>Payment</span>
            <div className="orderCheckedIcon">
              <img className="checkedIcon" src="/img/checked.png" alt="" />
            </div>
          </div>
          <div className={statusClass(1)}>
            <img src="/img/bake.png" alt="" />
            <span>Preparing</span>
            <div className="orderCheckedIcon">
              <img className="checkedIcon" src="/img/checked.png" alt="" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <img src="/img/bike.png" alt="" />
            <span>On The Way</span>
            <div className="orderCheckedIcon">
              <img className="checkedIcon" src="/img/checked.png" alt="" />
            </div>
          </div>
          <div className={statusClass(3)}>
            <img src="/img/delivered.png" alt="" />
            <span>Delivered</span>
            <div className="orderCheckedIcon">
              <img className="checkedIcon" src="/img/checked.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="orderRight">
        <div className="orderWraaperRight">
          <h2 className="carTh2">CART TOTAL</h2>
          <div className="orderTotalText">
            <b className="orderSubtotal">Subtotal:</b>&#8377;{orderslip?.amount}
          </div>
          <div className="orderTotalText">
            <b className="orderSubtotal">Discount:</b>&#8377;0.0
          </div>
          <div className="orderTotalText">
            <b className="orderSubtotal">Total:</b>&#8377;{orderslip?.amount}
          </div>
          <button disabled className="buttonOrder">
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
