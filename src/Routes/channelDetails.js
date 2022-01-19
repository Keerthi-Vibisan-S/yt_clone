import React from 'react';
import * as ai from 'react-icons/ai';

export default function ChannelDetails() {
  return(
    <section className='scroll-view-component'>
        <div>
            <p className='display-5'>My Channel</p>
            
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
                    <form>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Choose the Video File</label>
                            <input className="form-control" type="file" id="formFile" />
                        </div>

                        <div className='mb-3'>
                            <button className='btn btn-outline-success' type='submit'>Upload</button>
                        </div>

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  );
}
