import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [updatedTag, setUpdatedTag] = useState("");
    const [editedNote, setEditedNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMTI0N2JiM2RlOGFkYzAwOWVmZTIzIn0sImlhdCI6MTcwNjE2ODMwOH0.BqWx73ygsQd7kbC6pqmCLOyEsucB9IdvTtVekBcde94"


    useEffect(() => {
        getNotes();
    }, []);

    const host = "http://localhost:5000";
    const refClose = useRef(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "etitle") setUpdatedTitle(value);
        else if (name === "edescription") setUpdatedDescription(value);
        else if (name === "etag") setUpdatedTag(value);
    };

    const history = useHistory();

    const handleUpdate = async (noteId) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenote/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": t
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                    tag: updatedTag,
                }),
            });

            if (response.ok) {
                // Handle successful update response
                console.log("Note updated successfully");
                getNotes();
                history.push(`/home`);
                setShowModal(false);
            } else {
                console.error("Failed to update note");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const openEditModal = (note) => {
        setEditedNote(note);
        setShowModal(true);
    };

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                
                {notes.map((note) => {
                    return <Noteitem key={note._id} openEditModal ={openEditModal} note={note} />
                })}
            </div>

            <div className={`modal ${showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" >
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={updatedTitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={updatedDescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={updatedTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Close</button>
                            <button disabled={updatedTitle.length < 3 || updatedDescription.length < 5} onClick={() => handleUpdate(editedNote._id)} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
    
        </>
    );
    
}

export default Notes