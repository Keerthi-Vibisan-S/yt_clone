import React, { useState } from 'react';
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';

export default function NavSearch() {

    const navigate = useNavigate();

    const [box, setBox] = useState(false);
    const [searchData, setSearchData] = useState([]);

    async function handleSearch(e)
    {
        if(e.target.value !== "")
        {
            const url = `http://localhost:2022/search/do/${e.target.value}`;
            let res = await Axios.get(url);

            if(res.data && res.data.length != 0)
            {
                console.log(res.data);
                setSearchData(res.data);
                setBox(true);
            }

            else
            {
                setSearchData([]);
                setBox(false);
            }
        }

        else
        {
            setSearchData([]);
            setBox(false);
        }
    }

    function playVideo(data)
    {
        let user = JSON.parse(localStorage.getItem("userSno"));
        console.log({...data, Sno: user.Sno});
        navigate(`/play/${data.Vid}`, {state: {...data, Sno: user.Sno}});
    }

    return (
        <div className="search-bar w-100" style={{position: 'relative'}}>
            <form className="search-form d-flex align-items-center" style={{width: '60%', margin: '0 auto'}}>
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" onChange={(e) => handleSearch(e)} />
                <button title="Search"><i className="bi bi-search text-muted"></i></button>
            </form>
            {box?<div className='searchbox shadow' style={{width: '60%', margin: '0 auto'}}>
                {searchData.map(n => {
                    return(
                        <div key={n.Vid} onClick={() => playVideo(n)} className="border-bottom searchHover">              
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6>{n.vname}</h6>
                                <h6><img src={n.cimg} alt="" width="32" height="32" className="rounded-circle me-2" /> {n.cname}</h6>
                            </div>
                        </div>
                    )
                })}
                </div>:""}
        </div>

    )
}
