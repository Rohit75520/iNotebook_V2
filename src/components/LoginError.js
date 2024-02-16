import React from 'react';
import { Link } from 'react-router-dom';

const LoginError = () => {
  return (
    <div>
        <h1>Login Error:</h1><br />
        <p>you have not logged in please click here to login</p><br />
        <Link className="btn btn-primary mx-1" to="/" role="button">
            Login
        </Link>

    </div>
  );
}

export default LoginError;
