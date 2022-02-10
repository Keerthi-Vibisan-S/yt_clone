import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function ViewSubComments(props) {
    
    const {MCid} = props;
    const [data, setData] = useState([]);
    //Getting All subcomments
    useEffect(async () => {
        const url = `http://localhost:2022/subComment/getSubcomment/${MCid}`;
        let res = await Axios.get(url);
    
        if(res.data)
        {
            console.log(res.data);
            setData(res.data);
        }
    }, [props, MCid]);

    return (
    <div className='ms-1'>
        {data.map(n => {
            return(
                <div key={n.sub_id} className='my-2'>
                    <div className='d-flex justify-content-start align-items-center'>
                    <img src={n.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
                    <p>{n.namez} <span className='text-muted ms-2'>{n.datez}</span></p>
                    </div>
                    <p className='ms-4 ps-3'>{n.commentz}</p>
                </div>
                )
            })}
    </div>
  )
}
