import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footerContainer'>
          <div className="footeritem">
            <img src="/img/bg.png" alt="" />
          </div>
          <div className="footeritem">
          <div className="footerCard">
            <h2 className="footerMotto">OH YES ,WE DID ATHEXSHA PIZZA,WELL BAKED SLICE OF PIZZA.</h2>
          </div>
          <div className="footerCard">
            <h1 className="cardtitle">Find our RESTORANT</h1>
            <p className="cardText">
                1654 R Shivaji Road #304. <br />
                pune ,416234 <br />
                +91- 123 456 7890
            </p>
            <p className="cardText">
                1654 R Shivaji Road #304. <br />
                pune ,416234 <br />
                +91- 123 456 7890
            </p>
            <p className="cardText">
                1654 R Shivaji Road #304. <br />
                pune ,416234 <br />
                +91- 123 456 7890
            </p>
            <p className="cardText">
                1654 R Shivaji Road #304. <br />
                pune ,416234 <br />
                +91- 123 456 7890
            </p>
          </div>
            <div className="footerCard">
            <h1 className="cardtitle">Working HOURS</h1>
            <p className="cardText">
                MONDAY UNTIL FRIDAY . <br />
                 9:00 - 22:00
    
            </p>
            <p className="cardText">
                    SATURDAY - SUNDAY  <br />
                 12:00 - 24:00
    
            </p>
            </div>
          </div>
    </div>
  )
}

export default Footer