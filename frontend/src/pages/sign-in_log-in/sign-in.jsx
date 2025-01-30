import  { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name,
          email,
          password,
        });
  
        // Assuming the response contains the access token and refresh token
        if (response.status === 201) {
            alert('Registered');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data || 'Something went wrong');
        } else {
          setError('Network error');
        }
      }
    };


    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', {
            name,
            email,
            password,
          });
    
          // Assuming the response contains the access token and refresh token
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken)
            alert('Login Successful');
          } else {
            alert('Invalid email or password');
          }
        } catch (error) {
          if (error.response) {
            setError(error.response.data || 'Something went wrong');
          } else {
            setError('Network error');
          }
        }
      };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <div className="name-input">
                    <label htmlFor="name">Email:</label>
                    <input
                        type="email"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="email-input">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password-input">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" onClick={() => handleRegister()}>Register</button>
                <button type="submit" onClick={() => handleLogin()}>Log In</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default SignIn;