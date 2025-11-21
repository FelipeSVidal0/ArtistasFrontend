import "./Perfil.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { IonIcon } from '@ionic/react';
import { star, trash } from 'ionicons/icons';

function Perfil(){
    return(
        <div className="wrapper"> 
            <Navbar></Navbar>
            <main>

                <div className="artist">

                    <div className="art-text">

                        <h1>Miguel Dalsenter</h1>

                        <div className="categorias">

                            <input type="radio" id="btnT" name="grupo" hidden/>

                            <label for="btnT" class="box-categ">
                                Cantor
                            </label>

                        </div>

                        <p>
                            Lorem Ipsum is simply dummy 
                            text of the printing and  typesetting industry. 
                            Lorem Ipsum has been the industry's standard 
                            dummy text ever since the 1500s, when an 
                            unknown printer took a galley of  type and 
                            scrambled it to make a type specimen book.
                            It has survived not  only five centuries, 
                            but also the leap into electronic typesetting,  
                            remaining essentially unchanged. 
                        </p>

                    </div>

                    <div className="view">
                        <img alt="foto do artista" src={`${process.env.PUBLIC_URL}/Image.png`}/>
                        
                        <div className="avaliacao">
                            <p>5,0</p>

                            <div className="estrelas">
                                <IonIcon icon={star}/>
                                <IonIcon icon={star}/>
                                <IonIcon icon={star}/>
                                <IonIcon icon={star}/>
                                <IonIcon icon={star}/>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="pieces">
                    
                    <div className="top">
                        <h2>Minhas obras</h2>

                        <input type="radio" id="btnT" name="grupo" hidden/>

                        <label for="btnT" class="box-add">
                            <h3>+</h3>
                            <p>Adicionar  Obra</p>
                        </label>

                    </div>

                    <div className="cards-container">
                        <div className="card">
                           
                           <div className="left-card">
                                <img alt="foto do artista" src={`${process.env.PUBLIC_URL}/lenobrega.png`}/>
                           </div>

                            <div className="middle-card">
                                <div className="card-text">
                                    <h4 className="nome-obra">Nome da Obra</h4>
                                    <p className="descricao">
                                        Prévia de descrição da obra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac  consequat felis. Vestibulum tincidunt nisl turpis, sit amet pretium orci tincidunt sit amet. Maecenas sagittis nunc id eros mollis sagittis.  Curabitur nec felis nec  commodo eget.
                                    </p>
                                </div>

                                <div className="avaliacao-obra">

                                    <p>5,0</p>

                                    <IonIcon icon={star}/>

                                </div>

                            </div>

                            <div className="right-card">
                                
                                <p className="data-obra">
                                    18/11/25
                                </p>

                                <div className="card-btns">
                                    <button className="lixeira">
                                    <IonIcon icon={trash}/>
                                    </button>

                                    <button className="ver-mais">
                                        Ver mais    
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>

            </main>
            <Footer></Footer>
        </div>
    )
}

export default Perfil;