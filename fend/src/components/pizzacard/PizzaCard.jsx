import React from 'react';
import "./pizzacard.css";
import { Link } from 'react-router-dom';

const PizzaCard = ({ pizza }) => {
  console.log('Pizza Object:', pizza); // Add this console log to inspect the pizza object
  return (
    <div className='pizzacardContainer'>
         <Link to={`/product/${pizza._id}`}> <img src={pizza?.img} alt="" /></Link>
      <h1 className="pizzaCardTitle">{pizza?.title}</h1>
      <span className="pizzaCardPrice">&#8377;{pizza?.price[0]}</span>
      <p className="pizzaCardDesc">{pizza?.desc}</p>
    </div>
  );
};

export default PizzaCard;
