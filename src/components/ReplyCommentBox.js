import React, { useState, useEffect, useContext } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';
import ViewReplies from './ViewReplies';
import { Reply } from './ReplyBox';

export const ReRenderSubCom = React.createContext();

export default function ReplyCommentBox(props) {
    //! Using Abort Controller
    let abortController = new AbortController();

    //! Abort Cleanup
    useEffect(() => {
        return(
            abortController.abort()
        )
    });
    
    const [reRender, setReRender] = useState(true);

    const {setReplyBox, Vid, MCid} = props;
    const auth = JSON.parse(localStorage.getItem("userSno"));
    const d = new Date();
    const [data, setData] = useState({
        Sno: auth.Sno,
        Vid: null,
        MCid: "",
        comment: "",
        date: d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
    })

    const AddSubComment = async (e) => {
        e.preventDefault();
        //PassData to Database
        const url = `http://localhost:2022/subComment/addSubComment`;
        let res = await Axios.post(url, data);

        if(res.data == "subcommentAdded")
        {
            //console.log("Added");
            setData({...data, comment: ""});
        }

        setReRender(!reRender);
    }

    //! Using Use Context Hook
    const replies = useContext(Reply);

    return (
        <ReRenderSubCom.Provider value={reRender}>

        <div className='ms-4 mb-2'>

            {replies?<form onSubmit={(e) => AddSubComment(e)} className='w-100 d-flex justify-content-between align-items-center'>
                <img src={auth.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
                <input type="text" value={data.comment} onChange={(e) => setData({...data, comment: e.target.value, Vid: Vid, MCid: MCid})} className='w-100 comment-input' placeholder={`Reply publicly as ${auth.namez}`} />
                <button className='btn' type='submit'><ai.AiOutlineSend size={24}/></button>
                <button className='btn' onClick={() => setReplyBox(false)}><ai.AiOutlineClose className='text-danger' size={24}/></button>
            </form>:""}
            <div className='clear-fix'></div>

            <ViewReplies MCid = {MCid}/>
        </div>
        </ReRenderSubCom.Provider>
    );
}
