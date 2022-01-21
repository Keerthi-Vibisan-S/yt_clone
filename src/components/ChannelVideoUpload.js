import React, { useEffect, useState } from 'react';
import * as ai from 'react-icons/ai';
import Axios from 'axios';

export default function ChannelVideoUpload(props)
{
    //console.log(props);
    const {Sno, channel} = props;
    //console.log(channel," -- channel");
    const d = new Date();    
    const [data, setData] = useState(
    {
        Cno: channel,
        Sno: parseInt(Sno),
        vname: "",
        desc: "",
        //vtype: "",
        date:  String (d.getUTCDate()+'/'+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear()),
    }
    );

    const[file, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const [fileErr, setError] = useState("");
    const [btnShow, setBtnShow] = useState(true);

    useEffect(() => {
        setData({...data, Cno: props.channel})
    }, [props.channel])
    //console.log(data.Cno+ "-- data CNO");

    const uploadData = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("vfile", file);
        

        try
        {
            const url = "http://localhost:2022/video/upload";
            let res = await Axios.post(url, formdata, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(parseInt(Math.round(progressEvent.loaded * 100)/progressEvent.total))
                }
            });

            
            if(res.data)
            {
                console.log(res.data);
                //setData({...data, vpath: String(res.data)})
                console.log("Second Axios");
               const url = "http://localhost:2022/video/updateDb";

               let res2 = await Axios.post(url, {data: data, path: res.data});

                if(res2.data)
                {
                    setData({
                        Cno: channel,
                        Sno: parseInt(Sno),
                        vname: "",
                        desc: "",
                        vtype: "",
                        date:  String (d.getUTCDate()+'/'+(d.getUTCMonth()+1)+"/"+d.getUTCFullYear()),
                    });

                    setFile(null);
                    setTimeout(() => setProgress(0) , 5000);
                }
            }
        }
        catch(err)
        {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
              } else {
                console.log(err.response.data.msg);
              }
              setProgress(0)
        }
    }

    //File upload check Fumction
    function FileCheck(e)
    {
        let fname =String(e.target.files[0].name);
        let pos = fname.lastIndexOf('.');
        let ext = fname.slice(pos);
        let nm = fname.substring(0, pos);
        if (fname.includes(" "))
        {
            setError("* File name should not contain any Space");
            setBtnShow(false);
        }

        else if (!nm.includes(`_${data.Sno}`))
        {
            setError(`* File name should be ${nm+'_'+data.Sno+ext}`);
            setBtnShow(false);
        }

        else{
            setError("");
            setBtnShow(true);
            setFile(e.target.files[0]);
        }
    }

  return (

    <section>
        <button type="button" className="btn btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#uploadModal">
                <ai.AiOutlineUpload className='h5 pt-1'/> Upload
        </button>

            
        <div className="modal fade" id="uploadModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Upload Content into your channel</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={uploadData} autoComplete='off'>

                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Your Cno</label>
                                <input className="form-control" type="text" id="Name" value={data.Cno} readOnly/>
                            </div>
                
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">Content Name</label>
                                <input className="form-control" type="text" id="Name" value={data.vname} onChange={(event) => setData({...data, vname: event.target.value})}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <input className="form-control" type="text" id="desc" value={data.desc} onChange={(e) => setData({...data, desc: e.target.value})} />
                            </div>

                            <div>
                                <label htmlFor='vtype' className="form-label">Content Type</label>
                                <select className="form-select" id='vtype' value={data.vtype} onChange={(e) => setData({...data, vtype: e.target.value})} aria-label="Default select example">
                                    <option defaultValue>General</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Education">Education</option>
                                    <option value="Gaming">Gaming</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Choose the Video File ( <small className='text-primary fw-bold'>Format:</small><small className='text-success'> filename_YourCno.mp4 </small>)</label>
                                <input className="form-control" type="file" id="formFile" onChange={FileCheck} />
                                <small className='text-danger'>{fileErr}</small>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Upload Date</label>
                                <input className="form-control" type="text" id="desc" value={data.date}  readOnly />
                            </div>

                            <div className='mb-3'>
                                <button className={btnShow?"btn btn-success":"hide"} type='submit'>Upload</button>
                            </div>
                            <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{`${progress}%`}</div>
                            </div>
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
