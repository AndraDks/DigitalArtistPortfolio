import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// Import the header image
import headerImg from "../assets/img/header-img.png";
import TrackVisibility from "react-on-screen";
import { ArrowRightCircle } from "react-bootstrap-icons";

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Digital Designer", "Digital Art Producer", "Digital Art Specialist"];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000;

    useEffect(() => {
        // set interval to update text
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker);
        };
    }, [text]); 

    // handle text rotation and deletion
    const tick = () => {
        let i = loopNum % toRotate.length; // det which string to use
        let fullText = toRotate[i];
        // deleting or adding characters
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        // adjust typing speed delet
        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        // switch deleting mode
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period); // delay when deleting
        } else if (isDeleting && updatedText === "") {
            // next text string
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500); 
        }
    };

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <span className="tagline">Welcome to my Portfolio</span>
                                    <h1>{`Hi, I'm the digital artist `}<span className="wrap">{text}</span></h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet nisi at elit venenatis fringilla. Cras ut semper quam, sit.</p>
                                    <button onClick={() => console.log("connected")}>Let's connect <ArrowRightCircle size={25} /></button>
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <img src={headerImg} alt="Header Img" />
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
