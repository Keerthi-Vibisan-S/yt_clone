import { useLocation} from 'react-router-dom';
import * as bs from 'react-icons/bs';
import * as fc from 'react-icons/fc';
import VidepPlayerSugession from '../components/videpPlayerSugession';

export default function VideoPlayer(props) {
    
    let location = useLocation();
    const videoData = location.state;
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

      <VidepPlayerSugession Vid = {videoData.Vid}/>

  </section>
  );
}
