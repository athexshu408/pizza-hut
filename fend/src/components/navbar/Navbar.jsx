import React from "react";
import"./navbar.css"
import { useContext } from "react";
import {  useSelector } from "react-redux";
import { Link ,useLocation} from "react-router-dom";
import Cart from "../pages/cart/Cart";
import { Context } from "../pages/context/Context";
export const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)

  const { user , dispatch} = useContext(Context);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <div className="container">
      <div className="item">
        <div className="callButton">
          <img  src="/img/telephone.png" alt="" />
        </div>
        <div className="texts">
          <div className="text">ORDER NOW</div>
          <div className="text">987 654 3210 </div>
        </div>
      </div>
        <div className="item">
            <ul className="list">
            <li className="listItem">  <Link className="link" to={"/home"}   >Homepage</Link></li>
            <li className="listItem">Products</li>
            <li className="listItem">Menu</li>
           <Link className="link" to={"/home"}   >        <img style={{width:'300PX', height:"300PX"}}src="https://i.ibb.co/P66kK6G/2-removebg-preview.png" alt="" /> </Link>
            <li className="listItem">Event</li>
            <li className="listItem">Blog</li>
            <li className="listItem">Contact</li>
                
            </ul>
        </div>
        <Link to="/cart">
        <div className="item">
        {user && (  <div className="cart">
            <img style={{width:'30PX', height:"30PX"}}src="https://i.ibb.co/m8bV0ng/cart.png" alt="" />
             <div className="counter">{quantity}</div> 
            </div>)}  

        {user ? (
          <button className="btnlogout">
            <Link className="link" to={"/"}
              onClick={handleLogout}
            
            >
             <img  style={{ width: "20PX", height: "20PX" }} src="https://i.ibb.co/FXP60d8/kindpng-3120754.png" alt="" />
            </Link>
          </button>
        ) : isLoginPage ? (
          <button className="btnlogout">
            <Link className="link" to={"/register"}>
              Register
            </Link>
          </button>
        ) : isRegisterPage ? (
          <button className="btnlogout">
            <Link className="link" to={"/"}>
              Login
            </Link>
          </button>
        ) : null}


        </div>
        </Link>
    </div>
  );
};
