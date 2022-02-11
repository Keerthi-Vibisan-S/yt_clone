import React, { useEffect, useState } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';

export default function CommentsLike(props) {
    
    const {MCid} = props;
    const user = JSON.parse(localStorage.getItem("userSno")); 
    const [like, setLike] = useState(false);
    const abort = new AbortController();

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
        {like?<p className='btn' onClick={() => DelLike()}><ai.AiFillHeart className='text-danger' size={24}/> Loves</p>:<p className='btn' onClick={() => AddLike()}><ai.AiOutlineHeart size={24}/> Loves</p>}
    </div>
  )
}
