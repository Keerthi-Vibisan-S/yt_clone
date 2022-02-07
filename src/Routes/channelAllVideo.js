import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { useState } from 'react';
import * as bs from 'react-icons/bs';

export default function ChannelAllVideo() {

    const {Cno} = useParams();
    const [videos, setVideos] = useState([]);
    
    const navigate = useNavigate();

    useEffect(async () => {
        const url = `http://localhost:2022/channel//getAllVideos/${Cno}`;
        let res = await Axios.get(url);
        setVideos(res.data);
    }, [Cno]);

    function playVideo(n)
    {
        const Sno = JSON.parse(localStorage.getItem('authDetails'));
        navigate(`/play/${n.Vid}`, {state: {...n, Sno: Sno}});
    }

  return (
      <section className='scroll-view-component'>
          <div className='border-bottom'>
              <p className='text-muted'>Channel</p>
            <p className='display-6 fw-bold'>{videos.length == 0? "":videos[0].cname}</p>
          </div>
          <div className='home-video-display mt-4'>
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
                        //</Link>
                    );
                })}
            </div>
      </section>
  );
}
