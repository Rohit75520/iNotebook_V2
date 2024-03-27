const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const File = require('../models/File');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     const {uploadDirectory} = req.body;
    //     const directoryPath = uploadDirectory;
    //     cb(null, directoryPath);
    // },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }
            cb(null, buf.toString('hex') + path.extname(file.originalname));
        });
    }
});

const upload = multer({ storage });

//Router 5: api to upload files to database
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }

        // console.log(req.file);
        // console.log(req.file.path);
        const { userId } = req.body; // Assuming userId is passed in the request body

        const newFile = new File({
            filename: req.file.originalname,
            size: req.file.size,
            // path,
            user: userId
        });

        const savedFile = await newFile.save();
        res.json(savedFile);
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Router 6: api to retrieve files to database
router.get('/getfile/:filename', async (req, res) => {
    const filename = req.params.filename;
    // console.log(filename);
    
    try {
        // Find the file in the database by its filename
        const file = await File.findOne({ filename: filename });
        // If file not found, return 404 error
        if (!file) {
            return res.status(404).json({
                error: 'File not found'
            });
        }
        
        // Send the Base64 encoded file data in the response
        res.json({ file: file.filename });
        console.log({file});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;