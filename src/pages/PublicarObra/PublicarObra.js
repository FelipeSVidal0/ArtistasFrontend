import "./PublicarObra.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

/*<p>Adicione uma descrição da sua obra, sua inspiração para ela ou apenas algo que queira compartilhar...</p>*/

function PublicarObra(){
    return(
        <div className="wrapper">
            <Navbar></Navbar>

            <main>
                <div className="topAddObra">

                    <div className="AddObra-logo">
                        <img alt="logo" src={`${process.env.PUBLIC_URL}/logo-grande.png`}/>
                    </div>

                    <div className="AddObra-text">
                        <h1>Adicionar Obra</h1>
                        <p>Informações da Obra</p>
                    </div>

                </div>

                <div className="tipoDeObra">
                    <h2 className="h2">Selecione o Tipo da Obra</h2>

                    <div className="RadioBtns">
                        <div className="right-radios">
                            <label for="musica" className="RadioBtn">
                               
                                <input type="radio" id="musica" name="grupo-radio"></input>
                                <div>
                                    <h3>Música</h3>
                                    <p>Transforme sons em emoção!</p>
                                </div>
                               
                            </label>

                            <label for="audiovisual" className="RadioBtn">
                                
                                <input type="radio" id="audiovisual" name="grupo-radio"></input>
                                <div className="radioText">
                                    <h3>Audiovisual</h3>
                                    <p>Histórias que ganham vida na tela!</p>
                                </div>
                                
                            </label> 
                        </div>

                        <div>
                            <label for="artesanato" className="RadioBtn">
                                <input type="radio" id="artesanato" name="grupo-radio"></input>
                                <div className="radioText">
                                    <h3>Artesanato</h3>
                                    <p>Crie com as mãos, inspire com o coração!</p>
                                </div>
                                
                            </label>

                            <label for="desenhos" className="RadioBtn">
                                
                                <input type="radio" id="desenhos" name="grupo-radio"></input>
                                <div className="radioText">
                                    <h3>Desenhos e Pinturas</h3>
                                    <p>Quando o traço vira expressão!</p>
                                </div>
                                
                            </label> 
                        </div>  
                    </div>

                </div> 

                <div className="escolhaArquivo">
                    <h2 className="h2">Selecione o Arquivo</h2>
                    <div className="arquivoContainer">
                       <img alt="logo" src={`${process.env.PUBLIC_URL}/upload.png`}/>
                       <h3>Clique para selecionar as suas obras</h3>
                    </div>
                </div>

                <div className="descricaoObra">
                    <h2 className="h2">Descrição</h2>
                    <input className="descricaoContainer" type="text" placeholder="Adicione uma descrição da sua obra, sua inspiração para ela ou apenas algo que queira compartilhar..."></input>

                    <button className="publicarBtn">
                        <IonIcon className="plus" icon={addOutline}/>
                        Publicar Obra
                    </button>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}

export default PublicarObra;