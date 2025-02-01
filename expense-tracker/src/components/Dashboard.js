import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate= useNavigate();
    const doLogout = ()=>{
        navigate("/");
    }
  return (
    <div>
     <button onClick={doLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
