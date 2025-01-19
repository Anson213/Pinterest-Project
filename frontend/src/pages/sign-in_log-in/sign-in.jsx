import  { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth', {
            email,
            password,
          });
    
          // Assuming the response contains the access token and refresh token
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            alert('Login Successful');
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
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default SignIn;