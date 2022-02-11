import React, { useState } from 'react';
import ReplyCommentBox from './ReplyCommentBox';
import * as ai from 'react-icons/ai';

export default function ReplyBox(props) {

    const{Vid, MCid} = props;

    const [replyBox, setReplyBox] = useState(false);
    return (
        <div className=''>
            <div className='d-flex justify-content-start align-items-center ms-4'>
                <button className='btn'><ai.AiOutlineLike size={22}/></button>
                <button className='btn'><ai.AiOutlineDislike size={22}/></button>
                <button className='btn fw-bold text-muted' style={{width: 'fit-content'}} onClick={()=>setReplyBox(true)}>REPLY</button>
            </div>

            {replyBox?<ReplyCommentBox setReplyBox = {setReplyBox} Vid={Vid} MCid ={MCid}/>:""}
        </div>
    )
}
