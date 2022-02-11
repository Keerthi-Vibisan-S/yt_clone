import React, { useEffect, useState } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';
import ViewSubComments from './ViewSubComments';

export default function ViewReplies(props) {

    const {MCid} = props;

    const [show, setShow] = useState();

    useEffect(async () => {
        const url = `http://localhost:2022/subComment/check/${MCid}`;
        let res = await Axios.get(url);
        setShow(res.data[0].NSubComment);
    }, [MCid])

    if(show != 0)
    {
    return (
        <div className="mb-3">
            <h2 className="accordion-header" id="headingTwo">
            <p className="btn collapsed fw-bold" style={{color: '#065fd4', fontSize: '0.9rem'}} data-bs-toggle="collapse" data-bs-target={`#collapse${MCid}`} aria-expanded="false" aria-controls="collapseTwo">
            <ai.AiFillCaretDown className='me-2' /> {show == 1 ? "View reply":`View ${show} replies`}
            </p>
            </h2>
            <div id={`collapse${MCid}`} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <ViewSubComments MCid = {MCid}/>
            </div>
            </div>
        </div>
        )
    }

    else
    {
        return("");
    }
}
