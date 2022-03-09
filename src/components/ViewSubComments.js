import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import * as bs from 'react-icons/bs';

export default function ViewSubComments(props) {
    
    const auth = JSON.parse(localStorage.getItem("userSno"));
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
                <div key={n.sub_id} className='mb-2'>
                    <div className='d-flex justify-content-start align-items-center'>
                    <img src={n.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
                    <p>{n.namez} <span className='text-muted ms-2'>{n.datez}</span></p>
                    </div>
                    <p className='ms-4 ps-3 d-flex justify-content-between align-items-center'>{n.commentz}{n.Sno == auth.Sno?<div className="dropdown">
                  <button className="btn btn-white text-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <bs.BsThreeDotsVertical />
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Edit</a></li>
                    <li><a className="dropdown-item" href="#">Delete</a></li>
                  </ul>
                </div>:""}</p>
                </div>
                )
            })}
    </div>
  )
}
