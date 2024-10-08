import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
    // config the responsive behavior of the carousel
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <section className="skills" id="skills">
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>Skills</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                                Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit.
                            </p>
                            <Carousel responsive={responsive} infinite={true} className="skills-slider">
                                <div className="item">
                                    <img src={meter1} alt="UI/UX Design" />
                                    <h5>UI/UX Design</h5>
                                </div>
                                <div className="item">
                                    <img src={meter2} alt="Graphic Design" />
                                    <h5>Graphic Design</h5>
                                </div>
                                <div className="item">
                                    <img src={meter3} alt="Color Theory" />
                                    <h5>Color Theory</h5>
                                </div>
                                <div className="item">
                                    <img src={meter1} alt="Digital Illustration" />
                                    <h5>Digital Illustration</h5>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-left" src={colorSharp} alt="Background" />
        </section>
    );
}
