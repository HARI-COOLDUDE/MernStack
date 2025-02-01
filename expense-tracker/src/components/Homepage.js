import React, { use } from 'react'
import img1 from '../asset/img/dashboard.jpeg'
import { Link, useNavigate } from 'react-router-dom'
function Homepage() {

    const navigate= useNavigate();
    const doLogin = ()=>{
        console.log("Clicked")
        navigate("/dashboard");
    }
    return (
        <div className='container'>
            <div className='leftcontainer'>
                <p>Welcome to Expense Tracker</p>
                <p>Manage all your expenses here</p>
                <img src={img1} />

            </div>
            <div className='rightcontainer'>
                <div className= "formcard">
                <div>
                <h2 style={{alignSelf:'center'}}>Login</h2>
                    </div>
                    
                    <div>
                        <label>
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            placeholder='Enter your email'

                        />
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Enter your password'

                        />
                    </div>
                        <div>
                        <button onClick={doLogin}>Login</button>
                        </div>
                        <div>
                        <span style={{alignSelf:'center'}}>Not a user ? <Link to = "/register">Register</Link></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
