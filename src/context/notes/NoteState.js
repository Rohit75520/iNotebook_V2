import React,{ useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const notesInitial = [{title:"", description:"", tag:"" }]
  const [notes, setNotes] = useState([notesInitial])

  

  // Get all Notes
  // const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjZTA5MWIxZDExZmI4MjE2MmQ3NmZkIn0sImlhdCI6MTcwODAwMTU2M30.GXtxeD_r0ys8pTA7vzLp5c_mVcfcqZiphxbOvoqSFZg"
  const t = localStorage.getItem('token')
  // console.log(t);
 // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViY2RkYjI4MDYzZTA2N2ExZDg0Y2I0In0sImlhdCI6MTcwNzExNTYzMn0.zO0RAPKzPoP_GobqlmDIdR5z8O741zcsR6lE7LJGDFE";
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": t
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViMTI0N2JiM2RlOGFkYzAwOWVmZTIzIn0sImlhdCI6MTcwNjE2ODMwOH0.BqWx73ygsQd7kbC6pqmCLOyEsucB9IdvTtVekBcde94"
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch notes:', response.statusText);
      return;
    }

    const json = await response.json() 
    // console.log(json);
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": t
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": t
      }
    });
    const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (_id, title, description, tag) => {
    
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": t
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === _id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  const logout = () => {
    // console.log("logout");
    window.localStorage.removeItem('token')
    window.localStorage.setItem('isloggedIn', false)
    setIsAuthenticated(false);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, isAuthenticated, setIsAuthenticated, logout }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;