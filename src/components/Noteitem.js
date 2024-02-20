import React, { useContext} from "react";
import NoteContext from "../context/notes/noteContext";

const Noteitem = ({ note, openEditModal }) => {
  // const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  // const t = localStorage.getItem('token')


  // const ref = useRef(null);

  const handleDelete = async () => {
    try {
      // const response = await fetch(`${host}/api/notes/deletenote/${note._id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     "auth-token": t
      //   }
      // });
      // if (response.ok) {
        await deleteNote(note._id)
        // await alert('successfully deleted')
      
    } catch (error) {
      console.error("Error:", error);
    }
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
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
