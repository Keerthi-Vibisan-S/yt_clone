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
    async function responseGoogle(response)
    {
        //Setting login cred in local storage
        localStorage.setItem('authDetails', JSON.stringify(response.profileObj));
        setAuth(response.profileObj);

        const url = `http://localhost:2022/auth/details/${response.profileObj.email}`;
        let all = await Axios.get(url);
        localStorage.setItem("userSno", JSON.stringify(all.data[0]));
    }

    //Google Logout
    function logout(response)
    {
        //console.log(response);
        localStorage.removeItem('authDetails');
        localStorage.removeItem('userSno');
        localStorage.removeItem('authToken')
        window.location.reload(true);
    }

    function SidebarToggle()
    {
      document.getElementById("bodyToggle").classList.toggle("toggle-sidebar");
    }

    return(
        
        <header id="header" className="header fixed-top d-flex align-items-center justify-content-between">
      
          <i className='my-nav-imagebi bi-list toggle-sidebar-btn' onClick={() => SidebarToggle()}></i>
            
           
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogolook.net%2Fwp-content%2Fuploads%2F2021%2F06%2FYoutube-Logo.png&f=1&nofb=1" className='my-cursor-point img-fluid mx-3 my-nav-logo' alt=""/>
            
      
          <div className="search-bar w-100">
            <form className="search-form d-flex align-items-center" style={{width: '60%', margin: '0 auto'}}>
              <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
              <button type="submit" title="Search"><i className="bi bi-search text-muted"></i></button>
            </form>
          </div>
      
          <nav className="header-nav ms-auto">
            <div className="d-flex align-items-center">
      
              
              {session?<div className="nav-item dropdown pe-3">
      
                <div className="nav-link nav-profile d-flex align-items-center pe-0 my-cursor-point" data-bs-toggle="dropdown">
                  <img src={auth.imageUrl} alt="Profile" className="rounded-circle"/>
                  <span className="d-none d-md-block dropdown-toggle ps-2 text-dark">{auth.name}</span>
                </div>
      
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{auth.name}</h6>
                    <span>Viewer</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
      
                  <li>
                    <div className="dropdown-item d-flex align-items-center">
                        <Link to="/account" className='text-dark'>Your Account</Link>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
      
                 
                  <li className='dropdown-item d-flex align-items-center'>
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
                            cookiePolicy={'single_host_origin'}/></div>}
      
            </div>
          </nav>
      
        </header>
    )
}

