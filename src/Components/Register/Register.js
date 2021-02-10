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
            <h2>Register</h2>
            <input type="text" name="firstName" placeholder="First name"onChange={e => setFirstName(e.target.value)}/>
            <input type="text" name="lastName" placeholder="Last name" onChange={e => setLastName(e.target.value)}/>
            <input type="email" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <input type="varchar" name="verPassword" placeholder="Confirm Password" onChange={e => setVerPassword(e.target.value)}/>
            <input type="varchar" name="address1" placeholder="Address 1" onChange={e => setAddress1(e.target.value)}/>
            <input type="varchar" name="address2" placeholder="Apartment/Unit"onChange={e => setAddress2(e.target.value)}/>
            <input type="text" name="city" placeholder="City" onChange={e => setCity(e.target.value)}/>
            <input type="text" name="state" placeholder="State" onChange={e => setState(e.target.value)}/>
            <input type="varchar" name="zipCode" placeholder="Zip Code" onChange={e => setZipCode(e.target.value)}/>
            <button type="submit" onClick={handleRegister}>Register</button>
        </form>
        <p>Not a new User? <Link to="/">Login</Link> here</p>
        </div>
    )
}

export default connect(null, {setUser})(Register);