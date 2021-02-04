import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUser,clearUser } from '../../Redux/userReducer';
import { connect } from 'react-redux';
import { useEffect} from 'react'
import './Header.css';


const Header = (props) => {
    // console.log(props)
    const { user } = props;

    useEffect(() => {
        axios.get('/auth/me')
        .then(res =>{
            props.setUser(res.data)
        })
        .catch(err => console.error(err))
    })

    const handleLogout = () => {
        axios.get('/auth/logout')
        .then(() => {
            props.clearUser()
            props.history.push('/');
        })
        .catch((err) =>console.log(err));
    }

    return (
        <header className="header-container">
            <h1>Hey June!</h1>
            <nav className="navbar-container">
                <Link to='/shop'>Shop</Link>
                <Link to='/aboutUs'>About Us</Link>
                <Link to='/Contact'>Contact</Link>
                <Link to='/bag'>Bag</Link>
                {user.hasOwnProperty('user_id') && (
                    <Link to='/' onClick={handleLogout}>Logout</Link>
                )}
            </nav>
        </header>
    )
}

const mapStateToProps = reduxState => {
    return { 
        user: reduxState.userReducer.user
    }
}

export default connect(mapStateToProps,{ setUser,clearUser })(Header);