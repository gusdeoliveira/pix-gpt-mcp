import { useState } from 'react'
import './PixList.css'
import { NavLink } from 'react-router';

function PixList() {
  const [count, setCount] = useState(0)
  var pixBrCode = "test";
  var pixQrCode = "test";

  return (
    <>
      <h1>Payments List</h1>
      <NavLink to="/">New Payment</NavLink>
    </>
  )
}

export default PixList
