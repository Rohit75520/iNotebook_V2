import React, {createContext, useContext, useRef, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const fileIdContext = createContext();

const AddNote = ({uploadedImageUrl}) => {
    const context = useContext(noteContext);
    const history = useHistory
    const {addNote, setImageUrl,uploadFile} = context;
    const fileRef = useRef(null)
    // console.log(file);
    // console.log(addNote);
    const [file,setFile] = useState()
    
    const [error, setError] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null)


  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const fileId = await uploadFile(file);
      return fileId;
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
      throw error
    }
  };

    const [note, setNote] = useState({title: "", description: "", tag: "",fileId: "" })

    const handleClick = async (e)=>{
        e.preventDefault();
        const fileId = await handleSubmit()
        addNote(note.title, note.description, note.tag, fileId);
        setNote({title: "", description: "", tag: "" })  
        // console.log('1');
        // setNote(null)
        // history.push('/home')
      }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setFile(file)
        const fileBlob = new Blob([file], { type: 'application/pdf' })
        const fileURL = window.URL.createObjectURL(fileBlob);
        setImageUrl(fileURL)
      };


    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3" onSubmit={handleClick}noValidate>
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
                // value={fileId}
                ref={fileRef}
                accept=".pdf,.jpeg,.jpg,.png"
                onChange={handleFileChange}
                required
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