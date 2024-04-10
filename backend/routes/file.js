const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');


const upload = multer({ dest: null});

//Router 5: api to upload files to database
router.post('/', upload.single('file'), async (req, res) => {
// router.post('/',  async (req, res) => {

    try {
        // const fileData = req.file ? req.file.buffer : null;

        // console.log('req.file:',req.file);

        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
            // return next();
        }
        // console.log('1');

            const { userId } = req.body; // Assuming userId is passed in the request body
            // console.log('6');

            const newFile = new File({
                user: userId,
                filename: req.file.originalname,
                size: req.file.size,
                type: req.file.mimetype,
                data: req.file.buffer 
            });

            const savedFile = newFile.save();

            if(!savedFile) {
                return res.status(500).json({ error: 'Failed to save uploaded file'});
            }
            return res.json({ message: 'Form data saved successfully!!'});
        
       
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Router 6: api to retrieve files to database
// router.get('/getfile/:id', async (req, res) => {
//     try {
//         // Find the file in the database by its ID
//         let file = await File.findById(req.params.id);
//         // If file not found, return 404 error
//         if (!file) {
//             return res.status(404).json({
//                 error: 'File not found'
//             });
//         }
//         const contentType = file.contentType || 'application/octet-stream';
//         // Set the Content-Type header
//         res.contentType(contentType);
 
//         // Send the binary data of the file as the response body
//         console.log(file.data);
//         // return res.send(file.data); // Assuming file.data contains the binary data
//          res.status(200).json({success:true,dat:file.data})
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
router.get('/getfile/:id', async (req, res) => {
    try {
        // Find the file in the database by its ID
        let file = await File.findById(req.params.id);
        // If file not found, return 404 error
        if (!file) {
            return res.status(404).json({
                error: 'File not found'
            });
        }
        const contentType = file.contentType || 'application/octet-stream';
        // Set the Content-Type header
        res.contentType(contentType);
        // Set Content-Disposition header to specify filename
        res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
 
        // Send the binary data of the file as the response body
        res.send(file.data); // Assuming file.data contains the binary data
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;