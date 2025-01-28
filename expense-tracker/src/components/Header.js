import React from 'react'
import img1 from "../asset/img/logo.jpeg"
function Header() {
  return (
    <div className='Header'>
        <img src={img1}/>
      <h2>Expense-Tracker</h2>
    </div>
  )
}

export default Header
