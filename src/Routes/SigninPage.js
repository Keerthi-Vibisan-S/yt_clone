import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login';
import Axios from 'axios';
import * as fc from 'react-icons/fc';

export default function SigninPage() {
    const[auth, setAuth] = useState(null);
    const [danger, setDanger] = useState(false);

    async function responseGoogle(response)
    {
        setAuth(response.profileObj);

        //TODO: Sending googles token to backend for verification
        const url2 = 'http://localhost:2023/getToken';
        let res = await Axios.post(url2, {token: response.tokenId, email: response.profileObj.email});
        
        if(res.data)
        {
          const url = `http://localhost:2022/auth/details/${response.profileObj.email}`;
          let all = await Axios.get(url);
          localStorage.setItem('authToken', JSON.stringify(res.data));
          localStorage.setItem('authDetails', JSON.stringify(response.profileObj));
          localStorage.setItem("userSno", JSON.stringify(all.data[0]));
          window.location.reload();
        }
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

            {danger?<div>
              <p className='text-danger'>Un - Authorized</p>
            </div>: ""}
  </section>
)
}
