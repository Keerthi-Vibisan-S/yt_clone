import React, { Component } from 'react';
import Axios from 'axios';
import * as bs from 'react-icons/bs';
import * as fc from 'react-icons/fc';
import VidepPlayerSugession from '../components/videpPlayerSugession';

export default class NullDataVideo extends Component {
    
    state = {
        videoData: {},
        Vid: null
    }

    async componentDidMount()
    {
        const {Vid} = this.props;
        const url = `http://localhost:2022/video/video/${Vid}`;
        let res = await Axios.get(url);
        //console.log(res.data[0]);
        this.setState({videoData: res.data[0], Vid: Vid});
        //console.log(this.state.videoData);
    }
  
    render() {
        let videoData = this.state.videoData;
        let pathz = String(videoData.pathz);
        let pos = pathz.indexOf('/uploads/');
        let src = pathz.slice(pos);
        return (
            <section className='scroll-view-component video-play-page-display'>
                <section className='videoPlayer-settings'>
                    <div>
                        <video src = {src} autoPlay controls className='img-fluid'/>
                    </div>
                    <div className='p-3'>
                      <h5>{videoData.vname}</h5>
                      <div className='video-utils-align'>
                          <div><p>{videoData.views} views <bs.BsDot/> {videoData.upload_date}</p></div>
                          <div><fc.FcLikePlaceholder className='h2'/> {videoData.likes} Likes</div>
                      </div>
                    </div>
          
                    <div className='border-top p-3 video-utils-align'>
                      <h4>{videoData.cname}</h4>
                      <button className='btn btn-danger fw-bold'>SUBSCRIBE</button>
                    </div>
                    <div className='p-5'>
                        {videoData.vabout}
                    </div>
                </section>
          
                <VidepPlayerSugession Vid = {this.state.Vid}/>
          
            </section>
        );
  }
}
