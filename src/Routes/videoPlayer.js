import { useLocation, useParams} from 'react-router-dom';
import * as bs from 'react-icons/bs';
import * as fc from 'react-icons/fc';
import * as ai from 'react-icons/ai';
import VidepPlayerSugession from '../components/videpPlayerSugession';
import { useEffect, useState } from 'react';
import NullDataVideo from '../components/NullDataVideo';
import Axios from 'axios';

export default function VideoPlayer() {
    
    const {Vid} = useParams();
    const[passVid, setVid] = useState();
    const[existingSub, setexistingSub] = useState(false);
    const [subToast, setSubToast] = useState(false);
    const[unsub, setUnsub] = useState("");

    let location = useLocation();
    const videoData = location.state;

    useEffect(() => {
      // console.log("Setting Vid");
      setVid(Vid);
    }, [Vid])

    //Checking already subscribed
    useEffect(async () => {
      let signIn = JSON.parse(localStorage.getItem("authDetails"));
      if(signIn != null)
      {
        const url = `http://localhost:2022/media/getSub/${videoData.Sno}/${videoData.Cno}`;
        let res = await Axios.get(url);
        console.log(res.data);
        if(res.data == 'yes')
        {
          setexistingSub(true);
        }

        else
        {
          setexistingSub(false);
        }
        console.log(existingSub);
      }
    }, [videoData, Vid, unsub]);

    if(videoData == null)
    {
      console.log("--- Vid ---"+Vid);
      return(<NullDataVideo Vid = {Vid}/>);
    }

    else
    {

      async function unSubSupport()
      {
        const url = `http://localhost:2022/media/getSub/${videoData.Sno}/${videoData.Cno}`;
        let res = await Axios.get(url);
        console.log(res.data);
        if(res.data == 'yes')
        {
          setexistingSub(true);
        }
        else
        {
          setexistingSub(false);
        }
      }

      async function unSubscribe()
      {
        const url = `http://localhost:2022/media/unsub/${videoData.Sno}/${videoData.Cno}`;
        let res = await Axios.get(url);
        console.log(res.data);
        if(res.data == 'unsub')
        {
          unSubSupport();
          setUnsub(res.data);
        }
      }

      async function checkSubscribe()
      {
        let signIn = JSON.parse(localStorage.getItem("authDetails"));
        if(signIn == null)
        {
          console.log("Setting toast");
          setSubToast(true);
        }

        else
        {
          const url = "http://localhost:2022/media/addSub";
          let res = await Axios.post(url, videoData);
          if(res.data == 'okay')
          {
            console.log("Setting Sub");
            setexistingSub(true);
          }
        }
      }

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
                {existingSub?<button className='btn btn-outline-danger fw-bold' onClick={() => {unSubscribe()}}>UNSUBSCRIBE</button>:<button className='btn btn-danger fw-bold' onClick={() => {checkSubscribe()}}>SUBSCRIBE</button>}
                {subToast? <section className='my-toast-sub border-start p-2'>
                <p>Sign in to Like & Subscribe <ai.AiFillCloseCircle onClick={() => {setSubToast(false)}} className='text-danger' style={{cursor:'pointer'}}/></p>
              </section>:""}
              </div>
              <div className='p-5'>
                  {videoData.vabout}
              </div>
          </section>

          <VidepPlayerSugession Vid = {passVid}/>
      </section>
      );
    }

}
