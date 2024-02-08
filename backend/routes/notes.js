const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');

// Route 1: get loggedin user Details usign : POST "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
        return;
    }
})

// Route 2: Add a new Note using : POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
    
     try {
        const { title, description, tag } = req.body;
        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote)
     } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
     }   

})

// Route 3: update a existing Note using : POST "/api/notes/addnote". Login required

router.put('/updatenote/:id',fetchuser, async (req, res) => {
    const {title, description, tag } = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
})

// Route 4: Delete a existing Note using : DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id',fetchuser, async (req, res) => {

        const { title, description, tag } = req.body;

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}
    
        // allow deletion only id user own this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note});

})

module.exports = router;