import React, { useState, useEffect } from "react";
import "./id.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [sauce, setSauce] = useState(null);
  const [pizza, setPizza] = useState(null);
  const [size, setSize] = useState(0);
  const [base, setBase] = useState(null);
  const [cheese, setCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const location = useLocation();
  const [extras, setExtras] = useState([]);
  const [price, setPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [cheesePrice, setCheesePrice] = useState(0);
  const [veggiesPrice, setVeggiesPrice] = useState(0);
  const [extrasPrice, setExtrasPrice] = useState(0);
 
  const getSizeName = (index) => {
    const sizeNames = ["Small", "Medium", "Large"];
    return sizeNames[index];
  };

  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/" + path
        );
        setPizza(res.data);
        setPrice(res.data.price[0]);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
    getPost();
  }, [path]);

  const bases = [
    { id: "wheatThin", name: "Wheat Thin Crust", value: "WHEAT_THIN_CRUST", price: 8.99 },
    { id: "handTossed", name: "New Hand Tossed", value: "NEW_HAND_TOSSED", price: 9.99 },
    { id: "Brooklyn", name: "Brooklyn Style Crust", value: "BROOKLYN_STYLE_CRUST", price: 10.99 },
    { id: "Stuffed", name: "Stuffed Crust", value: "STUFFED_CRUST", price: 11.99 },
  ];

  const sauces = [
    { id: "tomatoSauce", name: "Tomato Sauce", value: "TOMATO", price: 0.00 },
    { id: "whiteSauce", name: "White Sauce", value: "WHITE", price: 0.50 },
    { id: "bbqSauce", name: "BBQ Sauce", value: "BBQ", price: 0.75 },
    { id: "pestoSauce", name: "Pesto Sauce", value: "PESTO", price: 1.00 },
  ];

  const cheeses = [
    { id: "mozzarellaCheese", name: "Mozzarella", value: "MOZZARELLA", price: 1.50 },
    { id: "cheddarCheese", name: "Cheddar", value: "CHEDDAR", price: 2.00 },
    { id: "parmesanCheese", name: "Parmesan", value: "PARMESAN", price: 1.75 },
    { id: "gorgonzolaCheese", name: "Gorgonzola", value: "GORGONZOLA", price: 2.50 },
  ];

  const veggies = [
    { id: "optionTomato", name: "Tomato", value: "TOMATO", price: 0.25 },
    { id: "optionMushroom", name: "Mushroom", value: "MUSHROOM", price: 0.50 },
    { id: "optionOnion", name: "Onion", value: "ONION", price: 0.30 },
    { id: "optionBellPepper", name: "Bell Pepper", value: "BELL_PEPPER", price: 0.40 },
  ];

  // Handle size change
  const handleSizeChange = (index) => {
    setSize(index);
    setPrice(pizza.price[index]);
  };

  // Handle base change
  const handleBaseChange = (baseType, price) => {
    setBase(baseType);
    setBasePrice(price);
    updateTotalPrice();
  };

  // Handle sauce change
  const handleSauceChange = (sauceType, price) => {
    setSauce(sauceType);
    updateTotalPrice();
  };

  // Handle cheese change
  const handleCheeseChange = (cheeseType, price) => {
    setCheese(cheeseType);
    setCheesePrice(price);
    updateTotalPrice();
  };

  // Handle veggies change
  const handleVeggiesChange = (selected) => {
    setSelectedVeggies(selected);
    const selectedVeggiesPrice = selected.reduce((total, veggie) => {
      const veggiePrice = veggies.find((v) => v.value === veggie).price;
      return total + veggiePrice;
    }, 0);
    setVeggiesPrice(selectedVeggiesPrice);
    updateTotalPrice();
  };

  // Handle extra option change
  const handleExtraOptionChange = (option) => {
    const isSelected = extras.some((extra) => extra.value === option.value);

    if (isSelected) {
      setExtras((prevExtras) => prevExtras.filter((extra) => extra.value !== option.value));
      setExtrasPrice((prevExtrasPrice) => prevExtrasPrice - option.price);
      updateTotalPrice();
    } else {
      setExtras((prevExtras) => [...prevExtras, option]);
      setExtrasPrice((prevExtrasPrice) => prevExtrasPrice + option.price);
      updateTotalPrice();
    }
  };

  // Update total price
  const updateTotalPrice = () => {
    const totalPrice = pizza.price[size] + basePrice + cheesePrice + veggiesPrice + extrasPrice;
    setPrice(totalPrice);
  };
// Function to update the total price
// const updateTotalPrice = (priceChange) => {
//   // Remove "$" symbol and convert the price to a number
//   const price = parseFloat(priceChange.replace("$", ""));
  
//   // Calculate the new total price based on the price change
//   setPrice((prevPrice) => prevPrice + price);
// };

  return (
    <div className="pContainer">
      <div className="leftContainer">
        <div className="imgContainerId">
          <img src={pizza?.img} alt="" />
        </div>
      </div>
      <div className="rightContainer">
        <h1 className="rcTitle">{pizza?.title}</h1>
        <span className="rcPrice">${price}</span>
        <p className="rcDesc">{pizza?.desc}</p>
        <h3 className="chooseSize">Choose the size </h3>
        {/* <div className="pizzaSizes">
          <div className="pizzaSize" onClick={() => handleSizeChange(0)}>
            <img src="https://i.ibb.co/h8537PX/asize.png" alt="img problem" />
            <span className="pizzzanumber">Small</span>
          </div>
          <div className="pizzaSize" onClick={() => handleSizeChange(1)}>
            <img src="https://i.ibb.co/h8537PX/asize.png" alt="" />
            <span className="pizzzanumber">Medium</span>
          </div>
          <div className="pizzaSize" onClick={() => handleSizeChange(2)}>
            <img src="https://i.ibb.co/h8537PX/asize.png" alt=" dont know" />
            <span className="pizzzanumber">Large</span>
          </div>
        </div> */}
        {/* <div className="pizzaSizes">
  {Pizza.price.map((price, index) => (
    <div key={index} className="pizzaSize" onClick={() => handleSizeChange(index)}>
      <img src="https://i.ibb.co/h8537PX/asize.png" alt={price} />
      <span className="pizzzanumber">{getSizeName(index)}</span>
      <span style={{display:'none'}} className="pizzzanumber">{price}</span>
    </div>
  ))}
</div> */}
<div className="pizzaSizes">
  <div className="pizzaSize" onClick={() => handleSizeChange(0)}>
    <img src="https://i.ibb.co/h8537PX/asize.png" alt="Small" />
    <span className="pizzzanumber">Small</span>
  </div>
  <div className="pizzaSize" onClick={() => handleSizeChange(1)}>
    <img src="https://i.ibb.co/h8537PX/asize.png" alt="Medium" />
    <span className="pizzzanumber">Medium</span>
  </div>
  <div className="pizzaSize" onClick={() => handleSizeChange(2)}>
    <img src="https://i.ibb.co/h8537PX/asize.png" alt="Large" />
    <span className="pizzzanumber">Large</span>
  </div>
</div>
        <br />
        {/* bases */}
        <h3 className="chooseSize">Choose the pizza Base </h3>
        <div className="pizzaaBase">
          {bases.map((bases) => (
            <div key={bases.id} className="bseOption">
              <input
                type="radio"
                id={bases.id}
                name="base"
                className="baseCheckbox"
                checked={base === bases.value}
                onChange={() => handleBaseChange(bases.value)}
              />
              <label htmlFor={bases.id}>{bases.name}</label>
            </div>
          ))}
        </div>

        <h3 className="chooseSauce">Choose the Pizza Sauce</h3>

        <div className="pizzaSauce">
          {sauces.map((sauces) => (
            <div key={sauces.id} className="sauceOption">
              <input
                type="radio"
                id={sauces.id}
                name="sauce"
                className="sauceRadio"
                checked={sauce === sauces.value}
                onChange={() => handleSauceChange(sauces.value)}
              />
              <label htmlFor={sauces.id}>{sauces.name}</label>
            </div>
          ))}
        </div>

        <h3 className="chooseCheese">Choose the Cheese Type</h3>

        <div className="pizzaCheese">
          {cheeses.map((cheeses) => (
            <div key={cheeses.id} className="cheeseOption">
              <input
                type="radio"
                id={cheeses.id}
                name="cheese"
                className="cheeseRadio"
                checked={cheese === cheeses.value}
                onChange={() => handleCheeseChange(cheeses.value)}
              />
              <label htmlFor={cheeses.id}>{cheeses.name}</label>
            </div>
          ))}
        </div>

        <h3 className="chooseVeggies">Choose Vegetables</h3>
        <div className="pizzaVeggies">
          {veggies.map((veggies) => (
            <div key={veggies.id} className="veggiesOption">
              <input
                type="checkbox"
                id={veggies.id}
                name="veggies"
                className="veggiesRadio"
                checked={selectedVeggies === veggies.value}
                onChange={() => handleVeggiesChange(veggies.value)}
              />
              <label htmlFor={veggies.id}>{veggies.name}</label>
            </div>
          ))}
        </div>

        <h3 className="chooseVeggies">Extra Ingridents</h3>
        <div className="pizzaVeggies">
          {pizza?.extraOptions.map((option) => (
            <div key={option._id} className="veggiesOption">
              <input
                type="checkbox"
                id={option.id}
                name={option.id}
                className="veggiesRadio"
                onChange={() => handleExtraOptionChange(option)}
              />
              <label htmlFor={option.id}>{option.text}</label>
            </div>
          ))}
        </div>

        <div className="addPizza">
          <input type="number" defaultValue={1} className="quantityCount" />
          <button className="addButton">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
