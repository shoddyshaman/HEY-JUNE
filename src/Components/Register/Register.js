import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { setUser } from '../../Redux/userReducer';
import './Register.css';



const Register = (props) => {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState('');
    const [address1,setAddress1] = useState('');
    const [address2,setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
     
    // console.log(props)
    const handleRegister = (e) => {
        e.preventDefault();
        if (password && password === verPassword) {
            axios.post('/auth/register', { firstName, lastName, email, password, address1, address2, city, state, zipCode})
                .then(res => {
                    props.setUser(res.data)
                    // alert('You are now registered!')
                    props.history.push('/home')
                })
                .catch(err => console.log(`this is where the error is`))
        } else {
            alert("Passwords don't match")
        }
    }

    return (
        <div>
        <form className="register-form" >
            <h3>Register</h3>
            First name: <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)}/>
            Last name: <input type="text" name="lastName" onChange={e => setLastName(e.target.value)}/>
            Email: <input type="email" name="email" onChange={e => setEmail(e.target.value)}/>
            Password: <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
            Verify Password: <input type="varchar" name="verPassword" onChange={e => setVerPassword(e.target.value)}/>
            Address 1: <input type="varchar" name="address1" onChange={e => setAddress1(e.target.value)}/>
            Address 2: <input type="varchar" name="address2" onChange={e => setAddress2(e.target.value)}/>
            City: <input type="text" name="city" onChange={e => setCity(e.target.value)}/>
            State: <input type="text" name="state" onChange={e => setState(e.target.value)}/>
            Zip Code: <input type="varchar" name="zipCode" onChange={e => setZipCode(e.target.value)}/>
            <button type="submit" onClick={handleRegister}>Register</button>
        </form>
        <p>Not a new User? <Link to="/">Login</Link> here</p>
        </div>
    )
}

export default connect(null, {setUser})(Register);