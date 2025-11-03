import Navbar from "../../components/navbar/Navbar";
import "./Home.css";

function Home() {

    return (
        <div>
            <Navbar></Navbar>

            <main>
                <section className="headline">
                    <div>
                        <h1>Onde sua arte <br></br> encontra o mundo!</h1>
                        <h5>Para quem faz da arte sua voz e da criatividade seu estilo</h5>
                    </div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/headline-img.svg`}></img>
                    </div>

                    <div className="triangle"></div>
                </section>

                <section className="containerArtisticAxes">
                    <div className="cardArtisticAxes">
                        <p>Transforme sons em emoção!</p>
                        <h4>Música</h4>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;