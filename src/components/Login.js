import React, {useState,useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import NoteContext from '../context/notes/noteContext';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();
    // const store = await response.json();
    const { isAuthenticated, logout ,setIsAuthenticated} = useContext(NoteContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        window.localStorage.setItem("isloggedIn", true)
        const response = await fetch("http://localhost:5000/api/auth/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        
        const json = await response.json()
        // console.log(json);
        if (json.success){
            setIsAuthenticated(true);
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('isloggedIn', true); 
           
            history.push("/home");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login