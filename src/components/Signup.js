import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "", confirmPassword: "" });
    const history = useHistory();
    const host = "http://localhost:5000"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })

        });
        if (!response.ok) {
            throw new Error("Failed to create ")
        }
        history.push('/login')
        console.log("user is created successfully");
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
        
        // const json = await response.json();
        // history.push('/login'); // Redirect to login page after successful signup
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.confirmPassword} onChange={onChange} name="confirmPassword" id="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
