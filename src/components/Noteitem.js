import React, { useContext} from "react";
import NoteContext from "../context/notes/noteContext";

const Noteitem = ({ file, note, openEditModal }) => {
  // const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const {getfile} = context
  // const t = localStorage.getItem('token')


  // const ref = useRef(null);

  const handleDelete = async () => {
    try {
        await deleteNote(note._id)   
    } catch (error) {
      console.error("Error:", error);
    }
  };
console.log(file);
  const handlePreview = async () => {
    getfile(file?.filename);
  };
  
  

  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 className="card-title">{note?.title}</h5>
            <i className="fa-regular fa-trash-can mx-2" onClick={handleDelete}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => openEditModal(note)}></i>
          </div>
          <p className="card-text">{note.description}</p>
          <button className='btn btn-primary' onClick={handlePreview}>preview</button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
