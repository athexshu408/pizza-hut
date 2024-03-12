import React from "react";
import { useContext } from "react";
import "./navbar.css";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Cart from "../pages/cart/Cart";
import { Context } from "../pages/context/Context";
export const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { user,dispatch } = useContext(Context);

  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  console.log(isLoginPage);
  console.log(isRegisterPage);

  const handleclick = () => {
    dispatch({ type: "LOGOUT" });
  }
  return (
    <div className="container">
      <div className="item">
        <div className="callButton">
          <img src="/img/telephone.png" alt="" />
        </div>
        <div className="texts">
          <div className="text">ORDER NOW</div>
          <div className="text">987 654 3210 </div>
        </div>
      </div>
      <div className="item">
        <ul className="list">
          <li className="listItem">Homepage</li>
          <li className="listItem">Products</li>
          <li className="listItem">Menu</li>
          <img
            style={{ width: "300PX", height: "300PX" }}
            src="https://i.ibb.co/P66kK6G/2-removebg-preview.png"
            alt=""
          />
          <li className="listItem">Event</li>
          <li className="listItem">Blog</li>
          <li className="listItem">Contact</li>
        </ul>
      </div>

      <div className="item">


    
        
        {user ? (
          <button className="btnlogout">
            <Link className="link" onClick={handleclick} to={"/"}>
              Logout
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
          <div className="cart"><Link className="link" >
          {user&&(<img
            style={{ width: "30PX", height: "30PX" }}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
          />)}</Link>
        </div>
       
      </div>
    </div>
  );
};
