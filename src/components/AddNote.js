import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import axios from 'axios';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const host = "http://localhost:5000"
    // const {uploadFile} = context;




  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(`${host}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

    const [note, setNote] = useState({title: "", description: "", tag: "" })
    const [file, setFile] = useState(null);

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        handleSubmit();
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3" onSubmit={handleClick} noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className='mb-3'>
            <label className="form-label">Upload File</label>
            <form>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </form>
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    );
}

export default AddNote