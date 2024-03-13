import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";

import ForgotPaaWord from "./components/forgotPass/ForgotPassWord";

import Footer from "./components/footer/Footer";
import Product from "./components/pages/id/Product";
import Cart from "./components/pages/cart/Cart";
import Order from "./components/pages/order/Order";
import Home from "./components/pages/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { Index } from "./components/pages/admin/Index";
import { useContext } from "react";
import { Context } from "./components/pages/context/Context";
import { useEffect } from "react";

function App() { 
useEffect(() => {
  document.body.scrollTop = 0; // For older browsers
  document.documentElement.scrollTop = 0; // For modern browsers
}, []);
  
  const {user} = useContext(Context)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/order" element={user?<Order />:<Login />} />
          <Route path="/home" element={user?<Home />:<Login />} />
          <Route path="/product/:id" element={user?<Product />:<Login />} />
         
          <Route path="/index" element={user?<Index />:<Login />} />
          <Route path="/forgotpass" element={<ForgotPaaWord />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
