import React, { useState } from 'react';
import axios from 'axios';
import formImg from "../assets/img/project-img.svg";

const ProjectForm = ({ onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [clientUrl, setClientUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('client_url', clientUrl);
    formData.append('is_visible', false); // Setați inițial la false
    if (image) {
      formData.append('file', image);
    }

    try {
      const response = await axios.post('http://localhost:3000/works', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onProjectCreated(response.data);
      setMessage('Project saved successfully! 🎉 You can find it in the "Hidden Projects" tab.');

      // Resetează formularul
      setTitle('');
      setDescription('');
      setImage('');
      setClientUrl('');

      // Ascunde mesajul după 15 secunde
      setTimeout(() => {
        setMessage('');
      }, 15000); // 15000 milisecunde = 15 secunde
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('An error occurred while saving the project. Please try again.');

      // Ascunde mesajul de eroare după 15 secunde
      setTimeout(() => {
        setMessage('');
      }, 15000);
    }
  };

  return (
    <div className="project-form-container">
      <div className="project-form">
        <div className="form-title">Add New Project</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label>Client URL:</label>
            <input
              type="text"
              value={clientUrl}
              onChange={(e) => setClientUrl(e.target.value)}
              placeholder="Enter client URL"
            />
          </div>
            {message && <div className="message">{message}</div>}
          <button type="submit">Save Project</button>
        </form>
      </div>
      <div className="form-image">
        <img src={formImg} alt="Add Project" />
      </div>
    </div>
  );
};

export default ProjectForm;