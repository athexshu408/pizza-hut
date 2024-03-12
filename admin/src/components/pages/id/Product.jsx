import React, { useState, useEffect } from "react";
import "./id.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const  dispatch = useDispatch();
  const [saucess, setSaucess] = useState();
  const [Pizza, setPizza] = useState(null);
  const [size, setSize] = useState(0);
  const [base, setBase] = useState(null);
  const [cheese, setCheese] = useState();
  const [selectedVeggies, setSelectedVeggies] = useState(null);
  const location = useLocation();
  const [extras, setExtras] = useState([]);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1)
  const [inventory, setInventory] = useState();

 
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
        console.log(res.data);
        setPizza(res.data);
     

        
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
    getPost();
  }, [path]);

  const bases = [
    {
      id: "wheatThin",
      name: "Wheat Thin Crust",
      value: "WHEAT_THIN_CRUST",
      price: "$8.99",
    },
    {
      id: "handTossed",
      name: "New Hand Tossed",
      value: "NEW_HAND_TOSSED",
      price: "$9.99",
    },
    {
      id: "Brooklyn",
      name: "Brooklyn Style Crust",
      value: "BROOKLYN_STYLE_CRUST",
      price: "$10.99",
    },
    {
      id: "Stuffed",
      name: "Stuffed Crust",
      value: "STUFFED_CRUST",
      price: "$11.99",
    },
  ];

  const veggies = [
    { id: "optionTomato", name: "Tomato", value: "TOMATO", price: "$0.25" },
    {
      id: "optionMushroom",
      name: "Mushroom",
      value: "MUSHROOM",
      price: "$0.50",
    },
    { id: "optionOnion", name: "Onion", value: "ONION", price: "$0.30" },
    {
      id: "optionBellPepper",
      name: "Bell Pepper",
      value: "BELL_PEPPER",
      price: "$0.40",
    },
  ];

  const cheeses = [
    {
      id: "mozzarellaCheese",
      name: "Mozzarella",
      value: "MOZZARELLA",
      price: "$1.50",
    },
    { id: "cheddarCheese", name: "Cheddar", value: "CHEDDAR", price: "$2.00" },
    {
      id: "parmesanCheese",
      name: "Parmesan",
      value: "PARMESAN",
      price: "$1.75",
    },
    {
      id: "gorgonzolaCheese",
      name: "Gorgonzola",
      value: "GORGONZOLA",
      price: "$2.50",
    },
  ];

  const sauces = [
    {
      id: "tomatoSauce",
      name: "Tomato Sauce",
      value: "TOMATO",
      price: "$0.00",
    },
    { id: "whiteSauce", name: "White Sauce", value: "WHITE", price: "$0.50" },
    { id: "bbqSauce", name: "BBQ Sauce", value: "BBQ", price: "$0.75" },
    { id: "pestoSauce", name: "Pesto Sauce", value: "PESTO", price: "$1.00" },
  ];

  const handleBaseChange = (baseType) => {
    setBase(baseType);
  };
  const handleSauceChange = (saucess) => {
    setSaucess(saucess);
  };

  const handleCheeseChange = (cheese) => {
    setCheese(cheese);
  };
  const handleVeggiesChange = (selectedVeggies) => {
    setSelectedVeggies(selectedVeggies);
  };

  const handleSizeChange = (index) => {
    const newSizePrice = Pizza.price[index];
    const prevSizePrice = price; // Get the price before updating the size
    const difference = newSizePrice - prevSizePrice;
    console.log("New size price:", newSizePrice);
    console.log("Previous size price:", prevSizePrice);
    console.log("Difference:", difference);
    setSize(index);
    setPrice((prevPrice) => prevPrice + difference);
  };
  

  const handleExtraOptionChange = (option) => {
    const isSelected = extras.includes(option);
    const optionPrice = option.price[0];
    
    if (isSelected) {
      setExtras((prevExtras) => prevExtras.filter((extra) => extra !== option));
      setPrice((prevPrice) => prevPrice - optionPrice);
    } else {
      setExtras((prevExtras) => [...prevExtras, option]);
      setPrice((prevPrice) => prevPrice + optionPrice);
    }
  };


  useEffect(() => {
    const id = "65efd6ca0612331b97589dac";
    const ProductData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/inventory/"+ id);
        setInventory(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    ProductData();
  }, []);




  const handleClick = async () => {
    // Addid logic for adding to cart
    dispatch(addProduct({...Pizza, size, extras, price,quantity }))
    console.log("Pizza added to cart:", { Pizza, size, extras, price ,quantity});

    
      const id = "65efd6ca0612331b97589dac";
      const productquantity = inventory?.bases - quantity;
      
        try {
          const res = await axios.post("http://localhost:5000/api/inventory/"+ id,{
            bases:productquantity,
            extras:productquantity,
          });
          setInventory(res.data);
          console.log(res.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      
    
        

  };

  if (!Pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pContainer">
      <div className="leftContainer">
        <div className="imgContainerId">
          <img src={Pizza?.img} alt="" />
        </div>
      </div>
      <div className="rightContainer">
        <h1 className="rcTitle">{Pizza?.title}</h1>
        <span className="rcPrice">&#8377;{price}</span>
        <p className="rcDesc">{Pizza?.desc}</p>
        <h3 className="chooseSize">Choose the size </h3>
        
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
                checked={saucess === sauces.value}
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
          {Pizza?.extraOptions.map((option) => (
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
          <input type="number" onChange={(e)=>setQuantity(e.target.value)} defaultValue={1} className="quantityCount" />
          <button onClick={handleClick} className="addButton">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
