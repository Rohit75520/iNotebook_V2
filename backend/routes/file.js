const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const fetchuser = require('../middleware/fetchuser');
const addnote = require('./notes')


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG files are allowed.'));
    }
  };

const upload = multer({
    dest: null,
    fileFilter: fileFilter
});

//Router 5: api to upload files to database
router.post('/upload', upload.single('file'), fetchuser, async (req, res, next) => {

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        } 

        const userId = req.user.id
        // console.log(userId);

        if (!userId) {
                return res.status(400).json({ error: 'userId is required' });
        }

        if (!req.user || !req.user.id) {
                return res.status(401).json({ error: 'Unauthorized' });
        }

        const newFile = new File({
            user: userId,
            filename: req.file.originalname,
            size: req.file.size,
            type: req.file.mimetype,
            data: req.file.buffer 
        });

        const savedFile = await newFile.save();
        req.fileId = savedFile._id
        console.log('File ID:', req.fileId);
        next();
        
        if(!savedFile) {
            return res.status(500).json({ error: 'Failed to save uploaded file'});
        }
        return res.json({ message: 'Form data saved successfully!!', fileId: req.fileId})
        // return res.redirect(`/addnote?fileId=${savedFile._id}`)
        
    
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Router 6: api to retrieve files to database
router.get('/getfile/:id', async (req, res) => {
    try {
        // Find the file in the database by its ID
        const fileId = req.params.id
        // const fileId = req.body
        // console.log(fileId);
        const file = await File.findById(fileId);

        // If file not found, return 404 error
        if (!file) {
            return res.status(404).json({
                error: 'File not found'
            });
        }
        const contentType = file.type || 'application/pdf';
        // console.log(contentType);
        // Set Content-Disposition header to specify filename
        res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
        // Set the Content-Type header
        res.contentType(contentType);
 
        // Send the binary data of the file as the response body
        res.send(file.data);
        // res.send(file.user) // Assuming file.data contains the binary data
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;