import React, {useEffect, useState } from 'react';
import Axios from 'axios';
import * as bs from 'react-icons/bs';
import * as gr from 'react-icons/gr';
import {useNavigate } from 'react-router-dom';

function Home()
{
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect( async () => {
        const url = "http://localhost:2022/video/getAll";
        let res = await Axios.get(url);
        console.log(res.data);
        setVideos(res.data);
    }, [])

    function playVideo(data)
    {
        let user = JSON.parse(localStorage.getItem("userSno"));
        console.log({...data, Sno: user.Sno});
        navigate(`/play/${data.Vid}`, {state: {...data, Sno: user.Sno}});
    }

    return(
        <section id="" className="">

            <div className='home-video-display'>
                            {videos.map((n) => {
                            // console.log(n);
                                let pathz = String(n.pathz);
                                let pos = pathz.indexOf('/uploads/');
                                let src = pathz.slice(pos);

                                return(
                                        //Passing Data through React-Router-DOM Navigator
                                        <div key={n.Vid} onClick={() => playVideo(n)} className='video-card'>
                                            <div>
                                                <video src={src} className='img-fluid'/>
                                            </div>
                                            <div className='p-2'>
                                                <h6>{n.vname}</h6>
                                                <p>{n.views} views <bs.BsDot /> {n.upload_date}</p>
                                                <h6><img src={n.cimg} alt="" width="32" height="32" className="rounded-circle me-2" /> {n.cname}</h6>
                                            </div>
                                        </div>
                                );
                            })}
                        </div>
            </section>
 
    )
}

export default Home;