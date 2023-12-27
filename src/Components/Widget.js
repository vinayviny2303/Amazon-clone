import Carousel from 'react-bootstrap/Carousel';

function Widget() {
    return (
            <Carousel data-bs-theme="dark"  style={{width:"60%"}}>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="./images/vinay1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <p style={{color:"whitesmoke", fontSize:30}}>Shop 'til You Drop: Discover the Latest Trends</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="./images/pic3.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <p style={{color:"whitesmoke", fontSize:30}}>Fashion Forward: Unleash Your Style</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src="./images/pic2.png"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p style={{color:"whitesmoke", fontSize:30}}>
                        Explore, Shop, Repeat: Your Fashion Haven
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
    );
}

export default Widget;