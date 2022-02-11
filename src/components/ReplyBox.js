import React, { useState } from 'react';
import ReplyCommentBox from './ReplyCommentBox';
import CommentsLike from './CommentsLike';

export default function ReplyBox(props) {

    const{Vid, MCid} = props;

    const [replyBox, setReplyBox] = useState(false);
    return (
        <div className=''>
            <div className='d-flex justify-content-start align-items-center ms-4'>
                <CommentsLike MCid = {MCid}/>
                <p className='btn fw-bold text-muted' style={{width: 'fit-content'}} onClick={()=>setReplyBox(true)}>REPLY</p>
            </div>

            {replyBox?<ReplyCommentBox setReplyBox = {setReplyBox} Vid={Vid} MCid ={MCid}/>:""}
        </div>
    )
}
