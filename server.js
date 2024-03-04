const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Express middleware to handle JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// API endpoint for handling form submission
app.post('/register', upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), (req, res) => {
  // Process form data and file uploads
  // In a real-world scenario, you might want to save file paths in a database

  // Example: Print form data and file paths
  console.log('Student Data:', req.body);
  console.log('Picture Path:', req.files['picture'][0].path);
  console.log('Resume Path:', req.files['resume'][0].path);

  // Respond with a success message or other relevant response
  res.json({ message: 'Student registration successful!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
