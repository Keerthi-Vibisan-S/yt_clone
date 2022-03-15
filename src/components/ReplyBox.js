import React, { useState, useEffect } from 'react';
import ReplyCommentBox from './ReplyCommentBox';
import CommentsLike from './CommentsLike';

export const Reply = React.createContext();

export default function ReplyBox(props) {
    //! Using Abort Controller
    let abortController = new AbortController();

    //! Abort Cleanup
    useEffect(() => {
        return(
            abortController.abort()
        )
    });

    //Use Context

    const{Vid, MCid} = props;

    const [replyBox, setReplyBox] = useState(false);
    return (
        <Reply.Provider value={replyBox}>

            <div className=''>
                <div className='d-flex justify-content-start align-items-center ms-4'>
                    <CommentsLike MCid = {MCid}/>
                    <p className='btn fw-bold text-muted' style={{width: 'fit-content'}} onClick={()=>setReplyBox(!replyBox)}>REPLY</p>
                </div>

                <ReplyCommentBox setReplyBox = {setReplyBox} Vid={Vid} MCid ={MCid}/>
                {/* <ViewReplies MCid = {MCid}/> */}
            </div>

        </Reply.Provider>
    )
}
