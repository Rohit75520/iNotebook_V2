import React, { useContext, useRef} from "react";
import NoteContext from "../context/notes/noteContext";

const Noteitem = ({ note, openEditModal }) => {
  const host = "http://localhost:5000";
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMTI0N2JiM2RlOGFkYzAwOWVmZTIzIn0sImlhdCI6MTcwNjE2ODMwOH0.BqWx73ygsQd7kbC6pqmCLOyEsucB9IdvTtVekBcde94"


  const ref = useRef(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${note._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": t
        }
      });
      if (response.ok) {
        deleteNote(note._id);
      }
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
