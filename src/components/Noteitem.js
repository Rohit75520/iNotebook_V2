import React, { useContext, useEffect, useState} from "react";
import NoteContext from "../context/notes/noteContext";
import ImagePreview from "./ImagePreview";

const Noteitem = ({ note }) => {
  // const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
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

  const fileId = '66179ca9f5a7096413478658'

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
        console.log(url);
        window.open(url,'_blank');
        // console.log(response);
        }else{
          console.error('unable to get file:', response.statusText);
          return;
        }


        // window.open(`${host}/api/upload/getfile/${fileId}`)
        // const data = response.blob()
        // const url = URL.createObjectURL(response.data);
        // console.log(url);
        // window.open(url,'_blank')
      //   console.log(response);
      
      // console.log(file);

      // const blob = await response.blob();      
      // const reader = new FileReader();     
      // reader.onload = () => {  
      // // Create a Blob URL for the Blob content
      // const blobUrl = URL.createObjectURL(blob);     
      //   // Open the Blob URL in a new tab
      //   const newTab = window.open();   
      //   newTab.document.write(`<iframe src="${blobUrl}" width="100%" height="100%"></iframe>`);  
      // };   
      // reader.readAsArrayBuffer(blob);

      
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
            <i className="fa-solid fa-pen-to-square mx-2"></i>
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
