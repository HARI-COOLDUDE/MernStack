import React, { useState, useEffect } from 'react'
import img1 from '../asset/img/cart.jpg'
import del from '../asset/img/delete.svg'
import edit from '../asset/img/edit.png'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api.json'
function Dashboard() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({})
    const [inputs1, setInputs1] = useState({})
    const [showdata, setShowData] = useState(false)
    const [myExpenses,setMyExpenses] = useState(null)
    const [showerror, setShowError] = useState(false)
    const [error, setError] = useState("")
    const [id, setID] = useState("")
    const [reload, setReload] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(api.baseurl + "record/get?email=" + localStorage.getItem("email"),
                    {
                        headers: {
                            "token": localStorage.getItem("token"),
                        },
                    }
                )
                const data = await res.json()
                console.log("Data ", data);
               
                if(data.count>0){
                    setShowData(true);
                    setMyExpenses(await(data.expenses));
                    console.log("EXPENSE ",myExpenses)
                    var sum = await data.expenses.reduce((a,v) =>  a = a + v.amount , 0 )
                    console.log("SUM",sum)
                    setTotal(sum);
                }
                else{
                    setShowData(false);
                }
            }
            catch (error) {
                console.log("Error ", error);
            }
        })();
    }, [showdata,reload])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleChange1 = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs1(values => ({ ...values, [name]: value }))
    }


    const openModal1 = (val) => {

        var modal1 = document.getElementById("myModal");
        setID(val);
        console.log("AA", val)
        modal1.style.display = "block";
    }
    const closeModal1 = () => {

        var modal1 = document.getElementById("myModal");
        console.log("BB")
        modal1.style.display = "none";
    }
    const openModal2 = (val,title,amount,date,type) => {
       setID(val);
        const updatedExpense ={title1:title,expense1:amount,type1:type,date1:date.substring(0,10) }
       
        setInputs1(updatedExpense)

        var modal2 = document.getElementById("myModal2");
        console.log("CC")
        modal2.style.display = "block";
    }
    const closeModal2 = (event) => {


        var modal2 = document.getElementById("myModal2");
        console.log("DD")
        modal2.style.display = "none";
    }

    const deleteExpense = async() => {
        try {
            const res = await fetch(api.baseurl + "record/remove?id=" + id,
                {
                    method:'DELETE',
                    headers: {
                        "token": localStorage.getItem("token"),
                    },
                }
            )
            const data = await res.json()
            console.log("Data ", data);
            setReload(!reload)
           
            
            
        }
        catch (error) {
            console.log("Error ", error);
        }
        

        closeModal1()
    }
    const editExpense = async(event) => {
        event.preventDefault();
        var paramsjson = {
            title: inputs1.title1,
            amount: inputs1.expense1,
            type: inputs1.type1,
            date: inputs1.date1,
            email: localStorage.getItem("email"),

        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "record/update?id="+id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token")
                    },
                    body: params
                }
            )
            const data = await res.json();
            if (data.success == true) {
                setReload(!reload)
               alert("Expense Updated")
            
            }
            else {
                alert("unable to update expense")
            }

        }
        catch (error) {
            console.log("Error ", error);
           alert("server error")
        }

        closeModal2()
    }
    const addExpense = async (event) => {
        event.preventDefault();
        console.log("Clicked", inputs);
        var paramsjson = {
            title: inputs.title,
            amount: inputs.expense,
            type: inputs.type,
            date: inputs.date,
            email: localStorage.getItem("email"),

        }
        var params = JSON.stringify(paramsjson);
        try {
            const res = await fetch(api.baseurl + "record/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token")
                    },
                    body: params
                }
            )
            const data = await res.json();
            if (data.success == true) {
                setError("Expense Added Successfully")
                setInputs({})
                setShowError(true);
                setReload(!reload)
            }
            else {
                setError("Unable to add expense")
                setShowError(true);
            }

        }
        catch (error) {
            console.log("Error ", error);
            setShowError(true);
            setError("Failed to connect with server");
        }
        setShowData(true)
    }
    return (
        <div className='container'>

            {showdata ?
                <div className='leftcontainer'>
                    <p>Total Expenses : {total}</p>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <p>Do you want to delete this expense?</p>
                            <button onClick={deleteExpense}>Yes</button>
                            <button onClick={closeModal1}>No</button>
                        </div>
                    </div>
                    <div id="myModal2" className="modal2">

                        <div className='formcard'>
                            <div>
                                <h2 style={{ alignSelf: 'center' }}>Edit Expense</h2>
                            </div>
                            <form onSubmit={editExpense}>
                                <div>
                                    <label>
                                        Title
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder='Enter your expense title'
                                        value={inputs1.title1 || ''}
                                        onChange={handleChange1}
                                        name='title1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Amount
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        placeholder='Enter your expense amount'
                                        value={inputs1.expense1 || ''}
                                        onChange={handleChange1}
                                        name='expense1'

                                    />
                                </div>
                                <div>
                                    <label>
                                        Type
                                    </label>
                                    <select
                                        value={inputs1.type1 || ''}
                                        onChange={handleChange1}
                                        name='type1'
                                        required

                                    >
                                        <option disabled value=''>Please Select Payment Type</option>
                                        <option value="cash">Cash</option>
                                        <option value="upi">UPI</option>
                                        <option value="card">Card</option>
                                    </select>

                                </div>
                                <div>
                                    <label>
                                        Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        placeholder='Enter Date'
                                        value={inputs1.date1 || ''}
                                        onChange={handleChange1}
                                        name='date1'

                                    />
                                </div>


                                <div>
                                    <button>Edit Expense</button>
                                </div>
                               

                            </form>
                            <div>
                                    <button onClick={closeModal2}>Cancel</button>
                                </div>
                        </div>

                    </div>
                    <div style={{ backgroundColor: 'lightgray', width: '100%', overflowY: 'scroll', marginBottom: '50px', justifyContent: 'center', justifyItems: 'center', padding: '20px' }}>
                        {myExpenses && myExpenses.map((val) =>
                            <div className='expenseCard' key={val._id}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', justifyItems: 'center', alignContent: 'center', alignItems: 'center' }}>
                                    <img onClick={()=>{openModal2(val._id,val.title,val.amount,val.date,val.type)}} style={{ width: '30px', height: '30px' }} src={edit} />
                                    <img onClick={() => { openModal1(val._id) }} style={{ width: '20px', height: '20px', marginLeft: '4px' }} src={del} />
                                </div>
                                <p>Title : {val.title}</p>
                                <p>Amount : {val.amount}</p>
                                <p>Date: {val.date.substring(0,10)}</p>
                                <p>Type : {val.type}</p>
                            </div>
                        )}
                    </div>
                </div>
                :
                <div className='leftcontainer'>
                    <p>Please add your expenses</p>
                    <img src={img1} />
                </div>
            }

            <div className='rightcontainer'>
                <div className='formcard'>
                    <div>
                        <h2 style={{ alignSelf: 'center' }}>Add Expense</h2>
                    </div>
                    <form onSubmit={addExpense}>
                        <div>
                            <label>
                                Title
                            </label>
                            <input
                                required
                                type="text"
                                placeholder='Enter your expense title'
                                value={inputs.title || ''}
                                onChange={handleChange}
                                name='title'

                            />
                        </div>
                        <div>
                            <label>
                                Amount
                            </label>
                            <input
                                required
                                type="number"
                                placeholder='Enter your expense amount'
                                value={inputs.expense || ''}
                                onChange={handleChange}
                                name='expense'

                            />
                        </div>
                        <div>
                            <label>
                                Type
                            </label>
                            <select
                                value={inputs.type || ''}
                                onChange={handleChange}
                                name='type'
                                required

                            >
                                <option disabled value=''>Please Select Payment Type</option>
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                            </select>

                        </div>
                        <div>
                            <label>
                                Date
                            </label>
                            <input
                                required
                                type="date"
                                placeholder='Enter Date'
                                value={inputs.date || ''}
                                onChange={handleChange}
                                name='date'

                            />
                        </div>

                        {
                            showerror ?
                                <div>
                                    <span style={{ color: 'red', alignSelf: 'center' }}>{error}</span>
                                </div> : null
                        }
                        <div>
                            <button>Add</button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
