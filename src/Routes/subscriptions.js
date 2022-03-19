import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from "react-elastic-carousel";
import SubVideoDisplay from '../components/SubVideoDisplay';

export default class Subscriptions extends Component {
    
    state = {
        channelDetails: [],
        userData: JSON.parse(localStorage.getItem("userSno"))
      };

    async componentDidMount()
    {
        // Axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('authToken'))}`;
        const url = `http://localhost:2022/media/getSubscriptions/${this.state.userData.Sno}`;

        let res = await Axios.get(url);

        if(res)
        {
            this.setState({channelDetails: res.data});
        }
        console.log("Data Channel ++++++++++");
        console.log(res.data);
        //console.log(this.state.allSubscriptions);
    }

    async unSubSupport()
    {
      console.log("exec");
      const url = `http://localhost:2022/media/getSubscriptions/${this.state.userData.Sno}`;
      let res = await Axios.get(url);

      this.setState({channelDetails: res.data});
    }

    unSubscribe(Cno)
    {
      //console.log(this.state.userData.Sno);
      const url = `http://localhost:2022/media/unsub/${this.state.userData.Sno}/${Cno}`;
      let res = Axios.get(url);

      res.then((data) => {
        console.log(data);
        if(data)
        {
          console.log("calling func");
          this.unSubSupport();
        }
      }).catch((err) => {
        if(err)
        {
          console.log(err);
        }
      })
    }

    render() {

      if(this.state.channelDetails.length == 0)
      {
        return(
          <div className='d-flex flex-column justify-content-center align-items-center scroll-view-component'>
            <p className='display-6 text-danger'>You have no Subscriptions yet</p>
            <p className='h4'>Check Home and Subscribe Channels</p>
          </div>
        )
      }

      else
      {
        const breakPoints = [
          { width: 1, itemsToShow: 4 },
          { width: 550, itemsToShow: 8 },
          { width: 768, itemsToShow: 10 },
          { width: 1200, itemsToShow: 16 },
          { width: 1400, itemsToShow: 18 },
        ];
        return(
          <section className='scroll-view-component my-mob-mt'>
              <Carousel breakPoints={breakPoints} showEmptySlots className="styling-example border-bottom">
                {this.state.channelDetails.map((n, index) => {
                  return(
                      <Link to={`/allVideos/${n.Cno}`} className="" key={index}>
                       <img src={n.cimg} alt="" style={{border: '1px solid gray'}} width="60" height="60" className="rounded-circle me-2" />
                      </Link>
                  );
                })}
              </Carousel>

              <div>
                {this.state.channelDetails.map((n, index) => {
                  return(
                    <SubVideoDisplay key={index} channel = {n.Cno}/>
                  )
                })}
              </div>
          </section>
        );
    }
  }
}
