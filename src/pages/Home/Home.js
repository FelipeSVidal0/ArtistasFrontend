import Navbar from "../../components/navbar/Navbar";
import footer from "../../components/footer/Footer";
import "./Home.css";
import { IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';
import Footer from "../../components/footer/Footer";

const obrasMock = [
    { name: "Obra 1", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 2", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 3", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 4", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
    { name: "Obra 5", author: "Author da obra", data: "14/10/2025", mediaEstrelas: "5,0" },
]

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

                    <img className="triangulo" src={`${process.env.PUBLIC_URL}/triangulo.png`}></img>
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

                <div className="label-destaques">
                    <h4>Obras em destaque</h4>

                    <div className="boxes-estrelas">
                        <input type="radio" id="btnT" name="grupo" hidden/>

                         <label for="btnT" class="box-estrelas">
                            Todos
                        </label>

                        <input type="radio" id="btn5" name="grupo" hidden/>
                        <label for="btn5" class="box-estrelas">
                            5
                            <IonIcon icon={star} />    
                        </label>

                        <input type="radio" id="btn4" name="grupo" hidden/>
                        <label for="btn4" class="box-estrelas">
                            4
                            <IonIcon icon={star} /> 

                        </label>

                        <input type="radio" id="btn3" name="grupo" hidden/>
                        <label for="btn3" class="box-estrelas">
                            3
                            <IonIcon icon={star} /> 
                        </label>

                        <input type="radio" id="btn2" name="grupo" hidden/>
                        <label for="btn2" class="box-estrelas">
                            2
                            <IonIcon icon={star} /> 
                        </label>

                        <input type="radio" id="btn1" name="grupo" hidden/>
                        <label for="btn1" class="box-estrelas">
                            1
                            <IonIcon icon={star} /> 
                        </label>
                    </div>
                </div>

                <div className="container-cards">

                    {obrasMock.map((obra) => (
                        <div className="card" key={obra.id}>
                            <img src={`${process.env.PUBLIC_URL}/lenobrega.png`} alt={`Capa de ${obra.name}`}/>

                            <div className="card-top">
                                <p className="nome-obra">{obra.name}</p>
                                <p className="nome-autor">{obra.author}</p>
                            </div>

                            <div className="card-bottom">
                                <p className="data-obra">{obra.data}</p>
                                <div className="avaliacao">
                                    <p className="numero-estrela">{obra.mediaEstrelas}</p>
                                    <IonIcon icon={star}></IonIcon>
                                </div>
                            </div>
                        </div>
                    ))

                    }

                </div>

            </main>
            
           <Footer></Footer>

        </div>
    );
}

export default Home;