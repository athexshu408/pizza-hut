import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
export const Index = () => {
  const [product, setProduct] = useState();
  const [orderedPizzza, setOrderedPizzza] = useState();
  const status = ["Recived","Preparing", "On the way", "Deliverd"];

  useEffect(() => {
    const ProductData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    ProductData();
  },[]);

  useEffect(() => {
    const pizzaOrder = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/");
        setOrderedPizzza(res.data);
      } catch  (error){
        console.error("Error fetching posts:", error);
      }
    };
    pizzaOrder();
  },[]);

  const [pizzaList, setPizzaList] = useState(product);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (error) {
      console.error("Error deleting pizza Details:", error);
    }
  };

  
  const handleStatus = async (id) => {
    console.log("Attempting to update status for order with ID:", id);
  
    const orderToUpdate = orderedPizzza.find((order) => order._id === id);
    if (!orderToUpdate) {
      console.log("Order not found for ID:", id);
      return; // Check if order exists
    }
  
    const currentStatusIndex = orderToUpdate.status;
    const nextStatusIndex = currentStatusIndex + 1;
    if (nextStatusIndex >= status.length) {
      console.log("Next status index exceeds status array bounds:", nextStatusIndex);
      return; // Ensure not to exceed status array bounds
    }
  
    const nextStatus = nextStatusIndex; // Use the index as the status value instead of the string
    
    try {
      const res = await axios.put("http://localhost:5000/api/orders/" + id, {
        status: nextStatus,
      });
      console.log("Status updated successfully for order with ID:", id);
  
      const updatedOrder = { ...orderToUpdate, status: nextStatusIndex };
      setOrderedPizzza([
        updatedOrder,
        ...orderedPizzza.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.error("Error updating status for order with ID:", id, err);
    }
  };
  
  return (
    <div className="indexContainer">
      <div className="indexItem">
        <h1 className="indexTitle">Products</h1>
        <table className="indexTabel">
          <tbody>
            <tr className="indextrTitle">
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>

          {product?.map((product) => (
            <tbody key={product._id}>
              <tr className="indextrTitle">
                <td>
                  <img
                    src={product.img}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product?._id.slice(0, 5)}</td>
                <td>{product.title}</td>
                <td>{product.price[0]}</td>
                <td>
                  <button className="indexButton">Edit</button>
                  <button
                    className="indexButton"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="indexItem">
        <h1 className="indexTitle">Orders</h1>
        <table className="indexTabel">
          <tbody>
            <tr className="indextrTitle">
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>

          {orderedPizzza?.map((order) => (
            <tbody key={order?._id}>
              <tr className="indextrTitle">
                <td>{order?._id ? order._id.slice(0, 5) + '...' : ''}...</td>
                <td>{order.username}</td>
                <td>{order.amount}</td>
                <td>Paid</td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className="indexButton"
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
