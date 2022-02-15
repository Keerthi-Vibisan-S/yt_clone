import React, { Component } from 'react';
import Axios from 'axios';

export default class ChannelVideoLists extends Component {

    state = {
        Sno: this.props.Sno,
        data: []
    }

    async componentDidMount()
    {
        let url = `http://localhost:2022/video/getVideos/${this.state.Sno}`;
        let res = await Axios.get(url);
        console.log(res.data);
        this.setState({data: res.data});
        console.log(this.state);
    }

  render() {
    return (
    <section className='mt-5 border-top'>
        <p className='display-6 mt-2'>Videos you Uploaded</p>
        <div className='home-video-display'>
            {this.state.data.map((n) => {
                let fpath = String(n.pathz);
                let pos = fpath.indexOf('uploads');
                let src = fpath.slice(pos);
                return(
                    <div className="card mt-2" key={n.Vid} style={{width: "18rem"}}>
                        <video src={`/${src}`} controls className='img-fluid' />
                        <div className="card-body">
                            <h5 className="card-title">{n.vname}</h5>
                            <p className="card-text">{n.vabout}</p>
                            <p className="card-text">{n.datez}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
    )
}
}
