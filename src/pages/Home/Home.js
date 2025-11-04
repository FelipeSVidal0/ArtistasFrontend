import Navbar from "../../components/navbar/Navbar";
import "./Home.css";

function Home() {

    return (
        <div className="wrapper">
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

                    <img src={`${process.env.PUBLIC_URL}/triangulo.png`}></img>
                </section>

                <section className="containerArtisticAxes">
                    <div className="cardArtisticAxes">
                        <div>
                            <p>Transforme sons em emoção!</p>
                            <p>Música</p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/musica.png`}></img>
                    </div>

                    <div className="cardArtisticAxes">
                        <div>
                            <p>Crie com as mãos, inspire com o coração!</p>
                            <p>Artesanato</p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/artesanato.png`}></img>
                    </div>

                    <div className="cardArtisticAxes">
                        <div>
                            <p>Histórias que ganham vida na tela!</p>
                            <p>Audiovisual</p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/audiovisual.png`}></img>
                    </div>

                    <div className="cardArtisticAxes">
                        <div>
                            <p>Quando o traço vira expressão!</p>
                            <p>Pinturas& <br></br> Desenhos</p>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/desenho.png`}></img>
                    </div>
                </section>

                <section className="teste">
                    <h4>Obras em destaque</h4>
                    <p>bla</p>
                    <p>bla</p>
                    <p>bla</p>
                    <p>bla</p>
                    <p>bla</p>
                </section>

            </main>
        </div>
    );
}

export default Home;