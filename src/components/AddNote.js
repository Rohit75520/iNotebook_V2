import React, {useContext, useRef, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddNote = ({uploadedImageUrl}) => {
    const context = useContext(noteContext);
    const history = useHistory
    const {addNote, setImageUrl} = context;
    const fileRef = useRef(null)
    // console.log(file);
    // console.log(addNote);
    const host = "http://localhost:5000"
    const [file,setFile] = useState()
    const [error, setError] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null)



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
    if (!error) { // Assuming 'error' is set on upload failure
      alert('File uploaded successfully');
    } else {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

    const [note, setNote] = useState({title: "", description: "", tag: "" })

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})  
        handleSubmit()
    }

    // const handleFile = () => {
    //   fileRef.current.click()
    // } 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        setFile(file)
        const fileBlob = new Blob([file], { type: 'application/pdf' })
        const fileURL = window.URL.createObjectURL(fileBlob);
        setImageUrl(fileURL)
        console.log(fileURL);
        // console.log(URL.createObjectURL(file));
      };
      // console.log(imageUrl);

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3" noValidate>
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
          <div className='mb-3' 
          // onClick={handleFile}
          >
            <label className="form-label">Upload File</label>
            <form>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                ref={fileRef}
                onChange={handleFileChange}
              />
            </form>
              {file ? <img src={URL.createObjectURL(file)} alt='uploaded image' className="form-control" style={{ maxWidth: '100px', maxHeight: '100px' }}/> : <img src='
              ' alt='image not found'/>}
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