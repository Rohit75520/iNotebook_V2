import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)

    return (
        <div className="container mt-5">
            <h1 className="mb-4">About Our App</h1>
            <p className="lead">
                Welcome to our application! We're dedicated to helping you organize your notes and thoughts in a simple and efficient way.
            </p>
            <p>
                Our mission is to provide you with a user-friendly platform where you can create, edit, and manage your notes with ease. Whether you're a student, professional, or simply someone who loves to jot down ideas, our app is designed to cater to your needs.
            </p>
            <p>
                With features such as categorization by tags, easy editing, and seamless synchronization across devices, we strive to make note-taking a breeze for you.
            </p>
            <p>
                Thank you for choosing our app to be your companion in your journey of productivity and organization. We're constantly improving and adding new features to enhance your experience, so stay tuned for updates!
            </p>
        </div>
      )
    }

export default About;