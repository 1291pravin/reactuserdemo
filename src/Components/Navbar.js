import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ isLoggedIn, logOut }) {


    return (
        <header>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
                <Link className="navbar-brand" to="/"> Test Project </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" >
                    <ul className="navbar-nav my-2 " style={{ "marginLeft": "auto" }}>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"> Home </Link>
                        </li>
                        {!isLoggedIn &&
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/user/login"> Login </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/user/register"> Register </Link>
                                </li>
                            </>
                        }
                        {isLoggedIn &&
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={`/user/profile/${isLoggedIn}`}> Profile </Link>
                                </li>
                                <li className="nav-item active">
                                    <p className="nav-link logout" onClick={logOut}> Logout </p>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
