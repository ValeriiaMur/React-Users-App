import React,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function Login(props){
    const history = useHistory();

    const [error, setError] = useState(
        ""
    )
    const [data, setData] = useState({
        Username:"",
        Password:"",
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
        axios.post("http://localhost:3000/api/login", data)
            .then(res => {
                console.log(res);
                if (res.status == 200){
                    localStorage.setItem("token", res.data.token);
                    history.push("/users");
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    return(
    <div className ='login-form'>
        <div className = "sign-in-htm">
            <div className = "group">
                <form onSubmit = {handleSubmit} id="form2" className="form">
                <h2 className = "form__title">Login</h2>
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
                <button type='submit'
                        className="button">
                    Submit
                </button>
                <p> Don't have an account? <Link to="/register">Register here</Link>!</p>
            </form>
            </div>
        </div>
    </div>
    )
}