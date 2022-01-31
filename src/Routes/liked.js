import React, { Component } from 'react';
import Axios from 'axios';
import * as bs from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

class Likeds extends Component
{
    state = {
        likesList: [],
        navigate: null
    };

    async componentDidMount()
    {
        this.setState({navigate: this.props.navigate})
        const userData = JSON.parse(localStorage.getItem("userSno"));
        const url = `http://localhost:2022/media/getMyLikes/${userData.Sno}`;
        let res = await Axios.get(url);
        //console.log(res.data);
        if(res)
        {
            this.setState({likesList: res.data});
        }
       //console.log(this.state.navigate);
    }

    playVideo(data)
    {
        let user = JSON.parse(localStorage.getItem("userSno"));
        console.log({...data, Sno: user.Sno});
        this.state.navigate(`/play/${data.Vid}`, {state: {...data, Sno: user.Sno}});
    }

    render() {
        if(this.state.likesList.length == 0)
        {
            return(
                <p className='mt-5 text-danger display-6'>You have no liked Video's yet...</p>
            );
        }
        return (
            <section className='scroll-view-component'>
                <div className='home-video-display'>
                {this.state.likesList.map((n, index) => {
                    let pathz = String(n.pathz);
                    let pos = pathz.indexOf('/uploads/');
                    let src = pathz.slice(pos);
                    return(
                        <div key={index} onClick={() => this.playVideo(n)} className='video-card'>
                                <div>
                                    <video src={src} className='img-fluid'/>
                                </div>
                                <div className='p-2'>
                                    <h6>{n.vname}</h6>
                                    <p>{n.views} views <bs.BsDot /> {n.upload_date}</p>
                                    <h6><img src={n.cimg} alt="" width="32" height="32" className="rounded-circle me-2" /> {n.cname}</h6>
                                </div>
                            </div>
                    );
                })}
                </div>
            </section>
        )
    }
}

export default function Liked()
{
    const navigate = useNavigate();
    return(
        <Likeds navigate={navigate}/>
    );
}