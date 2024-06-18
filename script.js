const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost/job_board', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes
const jobsRouter = require('./routes/jobs');
app.use('/api/jobs', jobsRouter);

// Start server
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new job
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    description: req.body.description,
    requirements: req.body.requirements,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/jobs', newJob);
      setNewJob({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
      });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div>
      <h1>Job Board</h1>

      {/* Job Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={newJob.company}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newJob.location}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={newJob.description}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="requirements"
          placeholder="Job Requirements"
          value={newJob.requirements}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Post Job</button>
      </form>

      {/* Job Listings */}
      <div>
        <h2>Job Listings</h2>
        {jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <p>{job.description}</p>
            <p>{job.requirements}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;