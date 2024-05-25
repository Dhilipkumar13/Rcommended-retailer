const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

// Setup storage and file naming for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Serve images from the uploads folder
app.use('/uploads', express.static('uploads'));

// Endpoint to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ imageUrl: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
