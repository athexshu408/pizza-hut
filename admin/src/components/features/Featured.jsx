import React, { useState } from "react";
import "./featured.css";


export const Featured = () => {
    const [index,setIndex] = useState(0)
  const images = [
    "/img/download.png",
   
    "/img/featured1.jpg",
    "/img/featured2.png",
    "/img/featured3.png",
    "/img/featured4.jpg",
    "/img/featured5.jpg",
  ];
  
const handleArrow = (direction)=>{
    if(direction ==="l"){
        setIndex(index !== 0 ? index-1 : 5)
    }
    if(direction ==="r"){
        setIndex(index !== 5 ? index+1 : 0)
    }
}

console.log(index)

   
  return (
    <div className="featureContainer">
      <div className="arrowContainer" style={{left:0}} onClick={()=>handleArrow("l")}>
        <img src="/img/arrowl.png" alt="" />
      </div>

      <div className="featureWrapper" style={{transform:`translateX(${-100*index}vw)`}}>
          {images.map((img, i) => (
        <div className="imgContainer" key={i}>
            <img src={img}  alt="" />
        </div>
          ))}
      </div>

      <div className="arrowContainer" style={{right:0}} onClick={()=>handleArrow("r")}>
        <img src="/img/arrowr.png" alt="" />
      </div>
    </div>
  );
};
