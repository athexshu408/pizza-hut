import React from 'react';
import "./pizzalist.css";
import PizzaCard from '../pizzacard/PizzaCard';

const PizzaList = ({ pizza }) => {
  return (
    <div className='pizzaContainer'>
      <div className="pizzalistTitle">The Best PIZZA IN TOWN</div>
      <p className="pizzalistDesc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio illum cum deserunt! Tempore eum accusantium, recusandae sunt eaque expedita nesciunt est? Sunt aut autem velit itaque voluptate eligendi ullam expedita.</p>
      <div className="wrapperPizzaList">
        {pizza && pizza.map(p => (
          <PizzaCard key={p.id} pizza={p} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
