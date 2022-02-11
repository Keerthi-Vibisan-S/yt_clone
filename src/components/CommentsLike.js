import React, { useEffect, useState } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';

export default function CommentsLike(props) {
    
    const {MCid} = props;
    const user = JSON.parse(localStorage.getItem("userSno")); 
    const [like, setLike] = useState(false);
    const abort = new AbortController();
    const [numLikes, setNumLikes] = useState("");

    useEffect(() => {
        const url = `http://localhost:2022/subComment/getNumber/${MCid}`;
        let res = Axios.get(url);

        res.then(data => {
           if(data.data[0].numLikes != 0)
           {
             setNumLikes(data.data[0].numLikes);
           }

           else
           {
               setNumLikes("");
           }
        })
    }, [MCid]);

    useEffect(() => {
        const url = `http://localhost:2022/subComment/checkLike/${MCid}/${user.Sno}`;
        let res = Axios.get(url, {signal: abort.signal});

        res.then(data => {
            if(data.data == "yes")
            {
                setLike(true);
            }
            else
            {
                setLike(false);
            }
        }).catch(err => {
            console.log(err);
        }) 

        // return(
        //     abort.abort()
        // )

    }, [MCid]);

    function LikeSupport()
    {
        const url = `http://localhost:2022/subComment/checkLike/${MCid}/${user.Sno}`;
        let res = Axios.get(url, {signal: abort.signal});

        res.then(data => {
            if(data.data == "yes")
            {
                setLike(true);
            }
            else
            {
                setLike(false);
            }
        }).catch(err => {
            console.log(err);
        }) 

        //For 👍 Likes
        const url2 = `http://localhost:2022/subComment/getNumber/${MCid}`;
        let res2 = Axios.get(url2);

        res2.then(data => {
           if(data.data[0].numLikes != 0)
           {
             setNumLikes(data.data[0].numLikes);
           }

           else
           {
               setNumLikes("");
           }
        })
    }

    async function AddLike()
    {
        const data = {
            Sno: user.Sno,
            Cid: MCid 
        }

        const url = `http://localhost:2022/subComment/addLike`;
        let res = await Axios.post(url, data);

        if(res.data == "inserted")
        {
            LikeSupport();
        }
    }

    async function DelLike()
    {

        const url = `http://localhost:2022/subComment/delLike/${MCid}/${user.Sno}`;
        let res = await Axios.get(url);

        if(res.data)
        {
            LikeSupport();
        }
    }

    return (
    <div>
        {like?<p className='btn fw-bold' style={{fontSize: '0.8rem'}} onClick={() => DelLike()}><ai.AiFillHeart className='text-danger' size={24}/> {numLikes} Loves</p>:<p className='btn fw-bold' style={{fontSize: '0.8rem'}} onClick={() => AddLike()}><ai.AiOutlineHeart size={24}/>{numLikes} Loves</p>}
    </div>
  )
}
