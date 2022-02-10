import React, { useState, useEffect } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';

export default function ReplyLikeBox(props) {

    const auth = JSON.parse(localStorage.getItem("userSno"));
    const {setReplyBox} = props;
    return (
        <div className='ms-4 my-2'>
            <form onSubmit={(e) => console.log("Submt reply")} className='w-100 d-flex justify-content-between align-items-center'>
                <img src={auth.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
                <input type="text" className='w-100 comment-input' placeholder={`Reply publicly as ${auth.namez}`} />
                <button type='submit' className='btn'><ai.AiOutlineSend size={24}/></button>
                <button type='submit' className='btn'><ai.AiOutlineClose className='text-danger' onClick={() => setReplyBox(false)} size={24}/></button>
            </form>
            <div className='clear-fix'></div>
        </div>
    );
}
