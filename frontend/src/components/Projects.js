import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import axios from 'axios';
import colorSharp2 from "../assets/img/color-sharp2.png";
import formImg from "../assets/img/project-img.svg";

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  // fetch projects data from server
  useEffect(() => {
    axios.get('http://localhost:3000/works')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  // handle  new project
  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
  };

  // toggle visibility 
  const toggleVisibility = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/works/${id}`, {
        is_visible: !currentStatus
      });
      setProjects(projects.map(project => 
        project.id === id ? response.data : project
      ));
    } catch (error) {
      console.error('Error updating project visibility:', error);
    }
  };

  // delete a project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/works/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <section className="project" id="projects">
      <Container fluid>
        <Row>
          <Col>
            <h2>Projects</h2>
            <Tab.Container id="projects-tabs" defaultActiveKey="first">
              <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                <Nav.Item>
                  <Nav.Link eventKey="first">Visible Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Hidden Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Projects Details</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content id="slideInUp">
                <Tab.Pane eventKey="first">
                  <Row>
                    {projects.filter(project => project.is_visible).map(project => (
                      <Col key={project.id} xs={12} sm={6} md={4}>
                        <ProjectCard
                          id={project.id}
                          title={project.title}
                          description={project.description}
                          imgUrl={project.image_url 
                            ? `http://localhost:3000/${project.image_url.replace(/\\/g, '/').replace(/^uploads\//, '')}` 
                            : formImg}
                          clientUrl={project.client_url}
                          isVisible={project.is_visible}
                          onVisibilityChange={(updatedProject) => setProjects(
                            projects.map(p => p.id === updatedProject.id ? updatedProject : p)
                          )}
                        />
                        <Button onClick={() => toggleVisibility(project.id, project.is_visible)} className="mt-2">
                          Hide
                        </Button>
                        <Button onClick={() => deleteProject(project.id)} className="ml-2 mt-2">
                          Delete
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    {projects.filter(project => !project.is_visible).map(project => (
                      <Col key={project.id} xs={12} sm={6} md={4}>
                        <div className="proj-imgbx">
                          <h4>{project.title}</h4>
                          <Button onClick={() => toggleVisibility(project.id, project.is_visible)} className="mt-2">
                            Show
                          </Button>
                          <Button onClick={() => deleteProject(project.id)} className="ml-2 mt-2">
                            Delete
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <p>Here you can add additional details or information about the projects, instructions for use, or anything relevant that needs to be displayed.</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <ProjectForm onProjectCreated={handleProjectCreated} />
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};
