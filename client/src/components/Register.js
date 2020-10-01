import React,{useState} from "react";
import axios from "axios"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default function Register(props){
    const [error, setError] = useState(
        ""
    )
    const [data, setData] = useState({
        Username:"",
        Password:"",
        Department:""
    })

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log(data);
        axios.post("http://localhost:3000/api/register", data)
            .then(res => {
                console.log(res);
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
    <div className ='login-form'>
        <div className = "sign-in-htm">
            <div className = "group">
            <form onSubmit = {handleSubmit} id="form1" className="form">
        <h2 className = "form__title">Register</h2>
          {error && <div className = "error">{error}</div>}
          <label className="label">
                Username
                <input 
                    type="text"
                    placeholder="Username"
                    name="Username"
                    value={data.username}
                    onChange={handleChange}
                    className="input"
                >
                </input>
          </label>
          <label className="label">
                Password
                <input
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={data.password}
                    onChange={handleChange}
                    className="input">
                </input>
          </label>
          <label className="label">
                Department
                <input
                    type="text"
                    placeholder="Department"
                    name="Department"
                    value={data.department}
                    onChange={handleChange}
                    className="input">
                </input>
          </label>
          <button type='submit'
                className="button">
              Submit
          </button>
          <Link to="/">Go Back</Link>
            </form>
            </div>
        </div>
    </div>
    )
}