import React from 'react'

import './orderdetails.css'

const OrderDetails = () => {
  return (
    <div className='odContainer'>OrderDetails
    
    <div className="cdWrapper">
        <h1 className="odTitle"> Yow will pay $12 after delivery.</h1>
        <div className="odItem">
            <label htmlFor="" className='odLabel'>Name Surname </label>
            <input type="text" placeholder='john doe' className="odinput" onChange={(e) => setCustomer(e.target.value)} />
        </div>
    </div>
    </div>
  )
}

export default OrderDetails