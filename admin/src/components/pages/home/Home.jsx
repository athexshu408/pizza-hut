import React, { useEffect, useState } from "react";

import axios from "axios";

import PizzaList from "../../productlist/PizzaList";
import { Featured } from "../../features/Featured";
import AddButton from "../../features/AddButton";
import Add from "../../features/Add";

const Home = () => {
  const [pizza, setPizza] = useState();
  const [close, setClose] = useState(true);


  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/");
        // console.log(res.data); // Log the response to verify data
        setPizza(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPizza();
  }, []);
  return (
    <div>
      <Featured />
      {<AddButton setClose={setClose} />}

      <PizzaList pizza={pizza} />
      {!close && <Add setClose={setClose} />}

    </div>
  );
};

export default Home;
