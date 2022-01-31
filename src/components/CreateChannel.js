import React, { useState } from 'react';
import Axios from 'axios';

export default function CreateChannel(props)
 {
    const {data} = props;
    const d = new Date();

    const [channel, setChannel] = useState(
    {
        Sno: data.Sno,
        cname: "",
        about: "",
        date: String (d.getUTCDate()+'/'+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear()),
        cimg: ""
    }
    );

    const CreateChannel = async (e) => {
        e.preventDefault();
        const url = "http://localhost:2022/channel/create";
        const url2 = `http://localhost:2022/auth/changeUser/${data.Sno}`;
        let res = await Axios.post(url, channel);
        if(res.data == "Channel-Created")
        {
            let res2 = await Axios.get(url2);
            let data2 = res2.data;
            if(data2 == "updated")
            {
                window.location.reload();
            }
        }
        setChannel({...channel, cname: "", about: ""});
    }
    
    return (
        <section className='mt-3'>
                        
            <p>Now you are just a viewer to upload videos and earn you need to start your own channel, Click the create button below and Fillup the details to Create your own Channel.</p>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModel">
            Create Channel
            </button>

            
            <div className="modal fade" id="uploadModel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Create your channel</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            <form onSubmit={CreateChannel}>
                                <div className="mb-3">
                                    <label htmlFor="uniqueId" className="form-label">Unique ID</label>
                                    <input type="text" className="form-control" value={channel.Sno} id="uniqueId" readOnly/>
                                    <div className="form-text">Not to share with anyone</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="channelName" className="form-label">Channel Name</label>
                                    <input type="text" value={channel.cname} onChange={(event) => setChannel({...channel, cname: event.target.value})} className="form-control" id="channelName" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="channelName" className="form-label">Channel Image</label>
                                    <input type="text" value={channel.cimg} onChange={(event) => setChannel({...channel, cimg: event.target.value})} className="form-control" id="channelName" />
                                </div>

                                <div class="form-floating mb-3">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}} onChange={(event) => setChannel({...channel, about: event.target.value})} value={channel.about}></textarea>
                                    <label htmlFor="floatingTextarea2">Description or About</label>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date of Creation</label>
                                    <input type="text" className="form-control" id="date" value={channel.date} readOnly/>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Create Channel</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}
