import React, { useState, useContext } from "react";
import axios from "axios";
import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../context/Context";

const Cart = () => {
  const { user } = useContext(Context);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [orderId, setOrderId] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/create-order",
        {
          amount: cart.total,
          username: user.username,
          address: user.address, // amount in rupees
        }
      );
      const { data } = response;
      setOrderId(data.id);
      const options = {
        key: "rzp_test_2Ean0CEjzlgpfJ", // Enter your Razorpay key
        amount: data.amount,
        currency: "INR",
        name: "AtheXshu Pizza",
        description: "Test Transaction",
        image: "https://i.ibb.co/D4gPqq0/2.png",
        order_id: data.id,
        handler: async function (response) {
          // Handle success
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);

          // Make a request to your backend route to save payment details
          try {
            await axios.post(
              "http://localhost:5000/api/orders/payment-success",
              {
                order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: cart.total,
                address: user.address,
                username: user.username, // amount in rupees
              }
            );
            alert("Payment details saved successfully");
            window.location.href = `http://localhost:3000/order?reference=${response.razorpay_payment_id}`;
          } catch (error) {
            console.error(error);
            alert("Failed to save payment details");
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#e7112e",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cartContainer">
      <div className="leftCart">
        <table className="cartTable">
          <tr className="cartTr">
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="cartImgContainer">
                  <img src={product.img} alt="" />
                </div>
              </td>
              <td>
                <span className="cartName">{product.title}</span>
              </td>
              <td>
                <span className="cartExtras">Double ingredient</span>
              </td>
              <td>
                <span className="cartPrice">${product.price}</span>
              </td>
              <td>
                <span className="cartQuantity">{product.quantity}</span>
              </td>
              <td>
                <span className="cartTotal">
                &#8377;{product.price * product.quantity}{" "}
                </span>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div className="rightCart">
        <div className="wraaperRight">
          <h2 className="carTh2">CART TOTAL</h2>
          <div className="cartTotalText">
            <b className="carSubtotal">Subtotal:</b>&#8377;{cart.total}
          </div>
          <div className="cartTotalText">
            <b className="carSubtotal">Discount:</b>&#8377;0.0
          </div>
          <div className="cartTotalText">
            <b className="carSubtotal">Total:</b>&#8377;{cart.total}
          </div>

          {open ? (
            <>
              <button onClick={handlePayment} className="buttonChecckOut">
                pay With razor pay
              </button>
              {/* <button className="buttonChecckOut">pay With razor pay</button> */}
            </>
          ) : (
            <button onClick={() => setopen(true)} className="buttonChecckOut">
              CHECCK OUT NOW!!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
