import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import Axios from 'axios';
import * as fc from 'react-icons/fc';

export default function SigninPage() {
    const[auth, setAuth] = useState(null);

    async function responseGoogle(response)
    {
        //Setting login cred in local storage
        localStorage.setItem('authDetails', JSON.stringify(response.profileObj));
        setAuth(response.profileObj);

        const url = `http://localhost:2022/auth/details/${response.profileObj.email}`;
        let all = await Axios.get(url);
        localStorage.setItem("userSno", JSON.stringify(all.data[0]));

        window.location.reload();
    }

  return (
   <section className='Signin-Page'>
       <p className='text-danger display-6 h6 fw-bold'>NanoTube</p>
       <p className='h5 fw-bold'>a YouTube Clone</p>
       <div className='mt-3'><GoogleLogin
            clientId="852762241490-gr45nghc45rkvjp5bs3uqvr4q0qkp80h.apps.googleusercontent.com"
            render={renderProps => (
             <button className='btn btn-muted' onClick={renderProps.onClick} disabled={renderProps.disabled}><fc.FcGoogle className='h2' /> </button>
             )}
            buttonText="Sign in"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            /></div>
            <p className='text-muted'>Sign In by Clicking the Icon</p>
  </section>
)
}
