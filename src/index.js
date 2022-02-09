import react from "react";
import reactDom from "react-dom";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Routes/home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import Sidebar from "./components/sidebar";
import Subscriptions from "./Routes/subscriptions";
import Liked from "./Routes/liked";
import './css/index.css';
import Navbar from "./components/navbar";
import Accounts from "./Routes/accounts";
import ChannelDetails from "./Routes/channelDetails";
import VideoPlayer from "./Routes/videoPlayer";
import ChannelAllVideo from "./Routes/channelAllVideo";
import SigninPage from "./Routes/SigninPage";

function Main()
{
  return(
   
     <Router>

       {localStorage.getItem('authDetails')!=null?
        <><Navbar />
       <section className='total-display-settings'>
        <Sidebar />

        <Routes>
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/subscriptions"  exact={true} element={<Subscriptions />} />
          <Route path="/liked"  exact={true} element={<Liked />} />
          <Route path="/account" exact   element={<Accounts />} />
          <Route path="/channel/:Sno" exact element={<ChannelDetails />} />
          <Route path="/play/:Vid" exact element={<VideoPlayer />} />
          <Route path="/allVideos/:Cno" exact element={<ChannelAllVideo />} />
        </Routes>
       </section></>:<Routes>
          <Route path="*" element={<SigninPage />}/>
        </Routes>}
     </Router>
    
  );
}

reactDom.render(<Main />, document.getElementById("root"));