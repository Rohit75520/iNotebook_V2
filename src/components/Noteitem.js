import React, { useContext, useEffect, useState} from "react";
import NoteContext from "../context/notes/noteContext";
import ImagePreview from "./ImagePreview";

const Noteitem = ({ note, openEditModal }) => {
  // const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const [fileURL, setFileURL] = useState('')
  // const [fileId, setFileId] = useState(null)
 
  // const {imageUrl, openImageInNewTab} = context;
  // const t = localStorage.getItem('token')


  // const ref = useRef(null);

  const handleDelete = async () => {
    try {
        await deleteNote(note._id)   
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fileId = '661635b72d045b7ce372702c'

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
        if (!response.ok) {
          console.error('unable to get file:', response.statusText);
          return;
        }

        // window.open(`${host}/api/upload/getfile/${fileId}`)
        // const data = response.blob()
        // const url = URL.createObjectURL(response.data);
        // console.log(url);
        // window.open(url,'_blank')
      //   console.log(response);
      // const fileBlob = await new Blob([response.arrayBuffer()], {type: 'application/pdf'})
      // //   console.log(fileBlob);
      // const fileURL = await window.URL.createObjectURL(fileBlob)
      // // console.log(fileURL);
      // setFileURL(fileURL)
      // window.open(fileURL,'_blank')
      // console.log(file);

      const blob = await response.blob();      
      const reader = new FileReader();     
      reader.onload = () => {  
      // Create a Blob URL for the Blob content
      const blobUrl = URL.createObjectURL(blob);     
        // Open the Blob URL in a new tab
        const newTab = window.open();   
        newTab.document.write(`<iframe src="${blobUrl}" width="100%" height="100%"></iframe>`);  
      };   
      reader.readAsArrayBuffer(blob);

      
      } catch (error) {
        console.error('Error get file:', error.message);
      }
    }

  // useEffect(() => {
  //   const fetchFileData = async () => {
  //     try {
  //       const response = await fetch(`${host}/api/upload/getfile/:id`);
  //       const blobData = await response.blob();
  //       const url = URL.createObjectURL(blobData);
  //       setFileURL(url);
  //     } catch (error) {
  //       console.error('Error fetching file data:', error);
  //     }
  //   }

  //   fetchFileData();

  //   return () => {
  //     if(fileURL){
  //       URL.revokeObjectURL(fileURL);
  //     }
  //   };

  // }, []);


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
          <button className='btn btn-primary' onClick={handlePreview}>preview</button>

        </div>
      </div>
    </div>
  );
};

export default Noteitem;
