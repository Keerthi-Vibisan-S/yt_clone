import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelVideoUpload from '../components/ChannelVideoUpload';
import Axios from 'axios';

import ChannelVideoLists from '../components/channelVideoLists';

export default function ChannelDetails() {

    const {Sno} = useParams();

    const [channel, setChannel] = useState({});

    useEffect(async () => {
        const url = `http://localhost:2022/channel/details/${Sno}`;
        let res = await Axios.get(url);
        setChannel(res.data[0]);
    }, []);
    console.log("Rendering --- "+Sno);
  return(
    <section className='scroll-view-component my-mob-mt'>
        <div>
            <p className='display-5'>My Channel</p>
            <p><strong>Name: </strong>{channel.cname}</p>
            <p><strong>Channel Description: </strong>{channel.about}</p>
            <p><strong>Creation-Date: </strong>{channel.datez}</p>
            
            <ChannelVideoUpload Sno={Sno} channel={parseInt(channel.Cno)}/>
            <ChannelVideoLists Sno={Sno} />
        </div>
    </section>
  );
}
