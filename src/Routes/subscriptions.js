import React, { Component } from 'react';
import Axios from 'axios';

export default class Subscriptions extends Component {
    
    state = {
        channelDetails: []
    };

    async componentDidMount()
    {
        const userData = JSON.parse(localStorage.getItem("userSno"));
        const url = `http://localhost:2022/media/getSubscriptions/${userData.Sno}`;

        let res = await Axios.get(url);

        if(res)
        {
            this.setState({channelDetails: res.data});
        }

        console.log(res.data);
        console.log(this.state.allSubscriptions);
    }

    render() {
        return (
            <section className='scroll-view-component'>
               {this.state.channelDetails.map((n, index) => {
                   return(
                    <div key={index} className="card mb-3" style={{width: "80%", margin: "0 auto"}}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={n.cimg} className="img-fluid rounded-start" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{n.cname}</h5>
                          <p className="card-text">{n.about}</p>
                          <button className='btn btn-outline-danger fw-bold float-end mt-5'>UNSUBSCRIBE</button>
                          <div className='clear-fix'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                   )
               })}
            </section>
        )
    }
}
