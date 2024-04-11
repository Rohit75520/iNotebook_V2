import React, { useContext, useRef, useState} from "react";
import NoteContext from "../context/notes/noteContext";

const Noteitem = ({ note, handleUpdate, openEditModal }) => {
  // const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const [iframeUrl, setIframeUrl] = useState(null)
  const [showIframe, setShowIframe] = useState(false)
  const refClose = useRef(null);
  // const [fileId, setFileId] = useState(null)

  // useEffect(() => {
  //   setFileId(note._id);
  // }, [note._id]);

  const handleDelete = async () => {
    try {
        await deleteNote(note._id)   
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fileId = '6617a0d6dbc07ac159dcc1b7'

  const host = "http://localhost:5000";
  const t = localStorage.getItem('token')
  
  const handlePreview = async () => {
    // console.log(fileId);
      try {
        const response = await fetch(`${host}/api/upload/getfile/${fileId}`, {
          method: 'GET',
          headers: {
            // 'Content-Type': '',
            'auth-token': t
          },
          responseType: 'blob'
        });
        if (response.ok) {
          let blob;
          const contentType = response.headers.get('Content-Type')

          if(contentType && contentType.includes("application/pdf")){
            const arrayBuffer = await response.arrayBuffer();
            blob = new Blob([arrayBuffer], {type: 'application/pdf'});
          } else {
            blob = await response.blob()
          }

          console.log(blob);
          if(!(blob instanceof Blob)){
            console.error('Response is not a blob:', blob);
            return;
          }
        const url = window.URL.createObjectURL(blob);
        setIframeUrl(url);
        setShowIframe(true)
        // console.log(url);
        // window.open(url,'_blank');
        // console.log(response);
        }else{
          console.error('unable to get file:', response.statusText);
          return;
        }

      
      } catch (error) {
        console.error('Error get file:', error.message);
      }
    }

    const handleClose = () => {
      setShowIframe(false);
    }


  return (
    <div className="col-md-3 ">
      <div className="card">
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 className="card-title">{note?.title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => openEditModal(note)}></i>
          </div>
          <p className="card-text">{note.description}</p>
          {/* <button className='btn btn-primary' onClick={<ImagePreview filename={selectedImage} />}>preview</button> */}
          {showIframe && (
            <>  
              <div className="d-flex justify-content-center mb-3">
              </div>
            </>
          )} 
          { !showIframe && (
            <button className='btn btn-primary' onClick={handlePreview}>preview</button>
          )}   
        </div>
      </div>
      <div className={`modal ${showIframe ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showIframe ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" >
                            <h5 className="modal-title" id="exampleModalLabel">Preview</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowIframe(false)}></button>
                        </div>
                        <div className="modal-body">
                          <iframe src={iframeUrl} style={{ width: '100%', height: '80vh' }}></iframe>
                        </div>
                        
                        <div className="modal-footer">
                        
                            <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setShowIframe(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
  );
};

export default Noteitem;
