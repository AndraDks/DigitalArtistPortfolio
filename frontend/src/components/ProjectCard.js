import React from 'react';
import axios from 'axios';
import { Col, Button } from 'react-bootstrap';

export const ProjectCard = ({ id, title, description, imgUrl, clientUrl, isVisible, onVisibilityChange }) => {

  const handleVisibilityToggle = () => {
    axios.patch(`http://localhost:3000/works/${id}`, { is_visible: !isVisible })
      .then(response => {
        onVisibilityChange(response.data);
      })
      .catch(error => {
        console.error("There was an error updating the visibility!", error);
      });
  };

  // Verifică dacă imgUrl este nul și folosește un URL de rezervă dacă este cazul
  const imageUrl = imgUrl ? `${imgUrl.replace(/\\/g, '/').replace(/^uploads\//, '')}` : "../assets/img/project-img.svg";

  // Asigură-te că clientUrl are schema corectă
  const formattedClientUrl = clientUrl.startsWith('http') ? clientUrl : `http://${clientUrl}`;

  return (
    <Col xs={4} sm={6} md={12}>
      <div className="proj-imgbx">
        <img src={imageUrl} alt={title} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
          <h3>
            <a href={formattedClientUrl} target="_blank" rel="noopener noreferrer">
              {clientUrl}
            </a>
          </h3>
          {/* <Button onClick={handleVisibilityToggle}>
            {isVisible ? 'Hide' : 'Show'}
          </Button> */}
        </div>
      </div>
    </Col>
  );
};