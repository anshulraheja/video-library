import './Header.css';
import React from 'react'
import { useAuth } from '../../context/auth-context'
import { Link } from 'react-router-dom'
const Header = () => {
    const { auth, logoutHandler } = useAuth();
    return (
        <header className="header">
            <div className='logo'>
                <Link to="/">
                    LOGO
                </Link>
            </div>
            <div className="desktop-actions">
                {auth.isLoggedIn === true ?
                    < div >
                        <button onClick={logoutHandler} className="btn-login">Logout</button>
                    </div>

                    :
                    <Link to="/signup" className="btn-login">
                        Sign up
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header