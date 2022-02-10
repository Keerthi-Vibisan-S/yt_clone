import React, { useState, useEffect } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';
import ReplyLikeBox from './ReplyLikeBox';
import ViewSubComments from './ViewSubComments';

export default function Comments(props) {

    const d = new Date();
    const {Vid} = props;
    const auth = JSON.parse(localStorage.getItem("userSno"));

    const [comments, setComments] = useState([]);
    const[showSub, setSub] = useState(false);
    const [replyBox, setReplyBox] = useState(false);
    
    const[data, setData] = useState({
      Sno: auth.Sno,
      Vid: "",
      comment: "",
      date: d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
    });
    
    //Selecting all comments for a particular video
    useEffect(async () => {
      const url = `http://localhost:2022/comments/get/${Vid}`;
      let res = await Axios.get(url);
      // console.log(res.data);
      if(res.data.length == 0)
      {
        setComments([]);
      }

      else
      {
        setComments(res.data);
      }
    }, [Vid]);

    //Comments Support
    const commentSupport = async () => {
      const url = `http://localhost:2022/comments/get/${Vid}`;
      let res = await Axios.get(url);
      // console.log(res.data);
      if(res.data.length == 0)
      {
        setComments([]);
      }

      else
      {
        setComments(res.data);
      }
    }

    //Add Comment
    const comment = (e) => {
      e.preventDefault();
      const url = `http://localhost:2022/comments/add`;
      let res = Axios.post(url, data);
      console.log("REspo");
      res.then((data) => {
        //console.log(data);
        if(data)
        {
          setData({...data, comment:""});
          commentSupport();
          //console.log("Comment Added -----");
        }
      }).catch( err => {
        if(err)
        {
          console.log(err);
        }
      })

    } 

  return (
      <section className='px-5 py-3 border-top'>
          <p className='text-muted'>Discussion</p>

          <div className='comment-input-div'>
            <form onSubmit={(e) => comment(e)} className='w-100 d-flex justify-content-between align-items-center'>
              <img src={auth.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
              <input type="text" value={data.comment} onChange={(event) => setData({...data, comment: event.target.value, Vid: Vid})} className='w-100 comment-input' placeholder={`Chat publicly as ${auth.namez}`} />
              <button type='submit' className='btn'><ai.AiOutlineSend size={24}/></button>
            </form>
            <div className='clear-fix'></div>
          </div>
          <div className='mt-5'></div>
          
          {comments.length == 0? "No Comments Yet, be the first to Start.": comments.map((n) => {
            return(
              <div key={n.Cid} className='mt-2'>
                <div className='d-flex justify-content-start align-items-center'>
                  <img src={n.imgurl} alt="userImage" width="32" height="32" className="rounded-circle me-2" />
                  <p>{n.namez} <span className='text-muted ms-2'>{n.datez}</span></p>
                </div>
                <p className='ms-4 ps-3'>{n.commentz}</p>

                <div className='d-flex justify-content-start align-items-center ms-4'>
                  <button className='btn'><ai.AiOutlineLike size={22}/></button>
                  <button className='btn'><ai.AiOutlineDislike size={22}/></button>
                  <button className='btn fw-bold text-muted' onClick={()=>setReplyBox(true)}>REPLY</button>
                 </div>

                {replyBox?<ReplyLikeBox setReplyBox = {setReplyBox} Vid={Vid} MCid ={n.Cid}/>:""}
                  
                {/* <div>{showSub?<p className='btn fw-bold ms-4' onClick={() => setSub(false)} style={{color: 'black'}}><ai.AiFillCaretUp className='me-2' /> View replies</p>:<p className='btn fw-bold ms-4' onClick={() => setSub(true)} style={{color: 'black'}}><ai.AiFillCaretDown className='me-2' /> View replies</p>}</div>
                {showSub?<ViewSubComments MCid = {n.Cid}/>:""} */}

              <div className="accordion ms-4" id={`accordionExample${n.Cid}`}>
                <div className="">
                  <h2 className="accordion-header" id={`headingOne${n.Cid}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${n.Cid}`} aria-expanded="true" aria-controls="collapseOne">
                      View replies
                    </button>
                  </h2>
                  <div id={`collapseOne${n.Cid}`} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={`#accordionExample${n.Cid}`}>
                    <div className="accordion-body">
                    <ViewSubComments MCid = {n.Cid}/>
                    </div>
                  </div>
                </div>
                </div>

              </div>
            );
          })}

      </section>
  );
}
