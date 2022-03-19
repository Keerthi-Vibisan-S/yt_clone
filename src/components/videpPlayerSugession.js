import React, { Component} from 'react';
import Axios from 'axios';
import * as bs from 'react-icons/bs';
import * as gr from 'react-icons/gr';
import {useNavigate } from 'react-router-dom';

class WrapSugession extends Component {

    state = {
        allData: [],
        Vid: null, 
        navigate: null
    }

    async componentDidMount()
    {
        const url = "http://localhost:2022/video/getAll";
        const res = await Axios.get(url);
        const {Vid, navigate} = this.props;
        // console.log(navigate);
        this.setState({allData: res.data, Vid: Vid, navigate:navigate});
        //console.log(this.state.navigate);
        
    }

    playVideo(data)
    {
        //window.location.reload();
        let user = JSON.parse(localStorage.getItem("userSno"));

        this.state.navigate(`/play/${data.Vid}`, {state: {...data, Sno: user.Sno}})
        this.setState({Vid: data.Vid})
    }
    
    render()
    {
      
      return (
  
      <section className='sugessions-side'>
          {this.state.allData.map((n)=>{
              if(n.Vid != this.state.Vid)
              {
                let pathz = String(n.pathz);
                let pos = pathz.indexOf('/uploads/');
                let src = pathz.slice(pos);
                  return(
                    <div key={n.Vid} onClick={() => this.playVideo(n)} className='video-card'>
                        <div>
                            <img src = {n.vimg} className='img-fluid'></img>
                            {/* <video src={src} className='img-fluid'/> */}
                        </div>
                        <div className='p-2'>
                            <h6>{n.vname}</h6>
                            <p>{n.views} views <bs.BsDot /> {n.upload_date}</p>
                            <h6><img src={n.cimg} alt="" width="32" height="32" className="rounded-circle me-2" /> {n.cname}</h6>
                        </div>
                    </div>
                  );
              }
          })}
      </section>
      
      );
  }
}

export default function VidepPlayerSugession(props)
{
    const navigate = useNavigate();
    return(
        <WrapSugession {...props} navigate={navigate} />
    )
}