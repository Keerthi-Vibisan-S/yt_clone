import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import * as ai from 'react-icons/ai';
import * as fa from 'react-icons/fa';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {Link} from 'react-router-dom';

export default function Navbar() {

    const[auth, setAuth] = useState(null);
    const [session, setSession] = useState(false);

    //Setting up details from Local Storage if userRefresh to StoreBack
    useEffect(()=> {
        const data = localStorage.getItem('authDetails');
        setAuth(JSON.parse(data));
    }, []);

    //Works when auth variable in useState changes
    useEffect(async () => {
        console.log(auth);
        if(auth == null)
        {
            console.log("Waiting to Signin");
        }

        else{
            const url = "http://localhost:2022/auth";
            const res = await Axios.post(url, auth);
            let resData = String (res.data);
            console.log(resData);
            if(resData === "Empty")
            {
                console.log("Registering user");
                const regUrl = "http://localhost:2022/auth/register";
                let register = await Axios.post(regUrl, auth);
                if(register.data == "ok")
                {
                    console.log("New User Added");
                    setSession(true);
                }
            }

            else
            {
                console.log("Already Registered Session True");
                setSession(true);
            }
        }
    }, [auth]);
     
    //Works when user clicks google sign-in button
    function responseGoogle(response)
    {
        //Setting login cred in local storage
        localStorage.setItem('authDetails', JSON.stringify(response.profileObj));
        setAuth(response.profileObj);
    }

    //Google Logout
    function logout(response)
    {
        console.log(response);
        localStorage.removeItem('authDetails');
        window.location.reload(true);
    }
    
    return (
        <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow">
            <div className="container-fluid">
                <img src='/images/logoFull.png' className='img-fluid logoFull' />
                <form className="d-flex" style={{width: "40%"}}>
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-muted" type="submit"><h4><ai.AiOutlineSearch /></h4></button>
                </form>

                {session?<div className="dropdown me-5">
                        <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={auth.imageUrl} alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{auth.name}</strong>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-light shadow" aria-labelledby="dropdownUser1">

                            <li className='border-bottom mb-2'>
                                <Link to="/account" className='nav-link h5'>Your Account</Link>
                            </li>

                            <li className='mb-2'>
                            <GoogleLogout
                            clientId="852762241490-gr45nghc45rkvjp5bs3uqvr4q0qkp80h.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className='btn text-dark' onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
                              )}
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                            >
                            </GoogleLogout>
                            </li>

                        </ul>
                    </div>:<div><GoogleLogin
                            clientId="852762241490-gr45nghc45rkvjp5bs3uqvr4q0qkp80h.apps.googleusercontent.com"
                            render={renderProps => (
                                <button className='btn btn-light outline' onClick={renderProps.onClick} disabled={renderProps.disabled}><fa.FaGoogle /> Sign in</button>
                              )}
                            buttonText="Sign in"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /></div>}
             </div>
        </nav>
    )
}

