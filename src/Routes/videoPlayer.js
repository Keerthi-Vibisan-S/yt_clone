import { useLocation, useParams} from 'react-router-dom';
import * as bs from 'react-icons/bs';
import * as fc from 'react-icons/fc';
import * as ai from 'react-icons/ai';
import VidepPlayerSugession from '../components/videpPlayerSugession';
import { useEffect, useState } from 'react';
import NullDataVideo from '../components/NullDataVideo';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function VideoPlayer() {
    
    const {Vid} = useParams();
    const[passVid, setVid] = useState();
    const[existingSub, setexistingSub] = useState(false);
    const [subToast, setSubToast] = useState(false);
    const[unsub, setUnsub] = useState("");
    const[like, setLike] = useState(false);
    const[likeCount, setLikeCount] = useState({});

    let location = useLocation();
    var videoData = location.state;
  

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
        
        //Likes
        const likeUrl = `http://localhost:2022/media/getLike/${videoData.Sno}/${videoData.Vid}`;
        let res2 = await Axios.get(likeUrl);
        if(res2.data == 'yes')
        {
          console.log("------- SETTING LIKE ---------- for "+videoData.Vid+ " Sno -- "+videoData.Sno);
          setLike(true);
        }

        else
        {
          setLike(false);
        }
      }

      //Likes COunt
      const conLikeUrl = `http://localhost:2022/media/numLike/${videoData.Vid}`;
      let res3 = await Axios.get(conLikeUrl);
      if(res3.data)
      {
        //console.log("------ SETTING LIKES NUM ------------");
        setLikeCount(res3.data[0]);
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

      //Adding Views Count asSoon as the video starts to play
      const ViewsCount = async () => {
        let signIn = JSON.parse(localStorage.getItem("authDetails"));
        if(signIn != null)
        {
          console.log("Seeing Video"+videoData.Vid);
          const url = `http://localhost:2022/views/add/${videoData.Vid}/${videoData.views}`;
          let res = await Axios.get(url);
          //console.log(res.data);
        }
      }

      //Like Adding
      async function addLike()
      {
        let signIn = JSON.parse(localStorage.getItem("authDetails"));
        if(signIn != null)
        {
         const url = `http://localhost:2022/media/setLike/${videoData.Sno}/${videoData.Vid}`;
          let res = await Axios.get(url);
          console.log(res.data+" ---------------");
          if(res.data == 'inserted')
          {
            setLike(true);
          }
        }

        else
        {
          setSubToast(true);
        }
      }

      async function remLike()
      {
        const url = `http://localhost:2022/media/remove/${videoData.Sno}/${videoData.Vid}`;
          let res = await Axios.get(url);
          console.log(res.data+" -- delete--");
          if(res.data == 'deleted')
          {
            setLike(false);
          }
      }

      let pathz = String(videoData.pathz);
      let pos = pathz.indexOf('/uploads/');
      let src = pathz.slice(pos);

      return (
      <section className='scroll-view-component video-play-page-display'>
          <section className='videoPlayer-settings'>
              <div>
                  <video src = {src} autoPlay controls className='img-fluid' onPlay={() => ViewsCount()}/>
              </div>
              <div className='p-3'>
                <h5>{videoData.vname}</h5>
                <div className='video-utils-align'>
                    <div><p>{videoData.views} views <bs.BsDot/> {videoData.upload_date}</p></div>
                    {like?<div><bs.BsSuitHeartFill onClick={() => remLike()} className='text-danger mx-1 h3'/> {likeCount.likesnum} Likes</div>:<div><bs.BsSuitHeartFill onClick={() => addLike()} className='h3 like-btn mx-1'/> {likeCount.likesnum} Likes</div>}
                </div>
              </div>
    
              <div className='border-top p-3 video-utils-align'>
                <Link to={`/allVideos/${videoData.Cno}`} className='h4 my-no-Link' style={{cursor: 'pointer'}}><img src={videoData.cimg} alt="" width="32" height="32" className="rounded-circle me-2" /> {videoData.cname}</Link>
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
