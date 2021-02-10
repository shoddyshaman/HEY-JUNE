import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { setUser } from '../../Redux/userReducer';
import './Login.css';

const Login = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = () => {
        
        axios.post('/auth/login', { email, password })
        .then(res => {
            props.setUser(res.data)
            props.history.push('/home')
        })
        .catch(err => console.log(`this is where the ${err}`))
    }

    return (
        <main className="login-container">
            <h3>Welcome Back Hooman!</h3>
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Lets Go!</button><br/>
            <p> New? <Link to="/register">Register</Link> here!</p>
        </main>
    )

}

export default connect(null, {setUser})(Login)

