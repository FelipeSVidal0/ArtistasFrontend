import "./ListaObras.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { IonIcon } from '@ionic/react';
import { star, trash } from 'ionicons/icons';

function ListaObras(){
    return(
        <div className="wrapper">
            <Navbar></Navbar>

            <main className="listaObras">

                <div className="listCateg">
                    <h1>Categoria: </h1>
                    <div className="Categ"> 
                        <h1>Música</h1>
                        <img src={`${process.env.PUBLIC_URL}/musica.png`}></img>
                    </div>
                </div>

                 <div className="list-cards-container">
                    <div className="cards">
                                           
                        <div className="left-cards">
                            <img alt="foto da obra" src={`${process.env.PUBLIC_URL}/lenobrega.png`}/>
                         </div>
                
                        <div className="middle-cards">
                             <div className="cards-text">
                                <h4 className="nomeObra">Nome da Obra</h4>
                                <p className="descricao">
                                    Prévia de descrição da obra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac  consequat felis. Vestibulum tincidunt nisl turpis, sit amet pretium orci tincidunt sit amet. Maecenas sagittis nunc id eros mollis sagittis.  Curabitur nec felis nec  commodo eget.
                                </p>
                            </div>
                
                            <div className="avaliacaoObra">
                
                                <p>5,0</p>
                
                                <IonIcon icon={star}/>
                
                            </div>
                
                        </div>
                
                        <div className="right-cards">
                                                
                            <p className="dataObra">
                                18/11/25
                            </p>
                
                            <div className="cards-btns">

                                <button className="list-ver-mais">
                                    Ver mais    
                                </button>
                                
                            </div>
                
                        </div>
                
                    </div>
                </div>

                <div className="list-cards-container">
                    <div className="cards">
                                           
                        <div className="left-cards">
                            <img alt="foto do da obra" src={`${process.env.PUBLIC_URL}/lenobrega.png`}/>
                         </div>
                
                        <div className="middle-cards">
                             <div className="cards-text">
                                <h4 className="nomeObra">Nome da Obra</h4>
                                <p className="descricao">
                                    Prévia de descrição da obra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac  consequat felis. Vestibulum tincidunt nisl turpis, sit amet pretium orci tincidunt sit amet. Maecenas sagittis nunc id eros mollis sagittis.  Curabitur nec felis nec  commodo eget.
                                </p>
                            </div>
                
                            <div className="avaliacaoObra">
                
                                <p>5,0</p>
                
                                <IonIcon icon={star}/>
                
                            </div>
                
                        </div>
                
                        <div className="right-cards">
                                                
                            <p className="dataObra">
                                18/11/25
                            </p>
                
                            <div className="cards-btns">
                                <button className="list-lixeira">
                                <IonIcon icon={trash}/>
                                </button>
                
                                <button className="list-ver-mais">
                                    Ver mais    
                                </button>
                            </div>
                
                        </div>
                
                    </div>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}

export default ListaObras;