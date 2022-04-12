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
                    MeTube
                </Link>
            </div>
            <div className="desktop-actions">
                {auth.isLoggedIn === true ?
                    < div >
                        <button onClick={logoutHandler} className="btn-login">Logout</button>
                    </div>

                    :
                    <div>
                        <button className="btn-login">
                            <Link to="/signup" >
                                Sign up
                            </Link>
                        </button>
                        <button className="btn-login">
                            <Link to="/login" >
                                Login
                            </Link>
                        </button>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header