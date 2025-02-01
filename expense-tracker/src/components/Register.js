import React from 'react'
import '../asset/css/Register.css'
function Register() {
  return (
    <div className='maincontainer'>
    <div className='formcard'>
                    <div>
                    <h2 style={{alignSelf:'center'}}>Register</h2>
                    </div>
                    
                    <div>
                        <label>
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder='Enter your name'

                        />
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
                        <label>
                            Confirm Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder='Confirm your password'

                        />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </div>
                </div>
  )
}

export default Register