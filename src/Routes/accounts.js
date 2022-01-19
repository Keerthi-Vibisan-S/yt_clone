import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function Accounts() {
    
    const [data, setData] = useState({});
    console.log('hi');
    
    useEffect(async () => {
        let d = JSON.parse(localStorage.getItem("authDetails"));
        
        const url = `http://localhost:2022/auth/details/${d.email}`;
        let all = await Axios.get(url);
        setData(all.data[0]);
    },[]);

    return (
        <section className='scroll-view-component'>
            <section className='video-page-settings'>
                <div style={{alignItems: 'start'}}>    
                    <h2 className='mb-3 pb-2 border-bottom'>Account Settings</h2>
                    <p><strong>Name:</strong> {data.namez}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Contact:</strong> {data.contact}</p>
                    <p><strong>User Type:</strong> {data.usertype}</p>
                </div>

                <div>
                <img src={data.imgurl} alt="" width="200" height="200" className="rounded-circle" />
                </div>
            </section>
        </section>
    )
}
