import "./Footer.css";
import { IonIcon } from '@ionic/react';
import { logoFacebook } from 'ionicons/icons';
import { logoInstagram } from 'ionicons/icons';


function Footer(){
    return(
        <footer>
            
            <div className="footer-top">

                <div className="logo">
                    <img src={`${process.env.PUBLIC_URL}/logo-grande.png`} alt='Logo do site'></img>
                    <div className="logo-texto">
                        <h3>+ARTE</h3>
                        <p>Para Quem Vive a Arte!</p>
                    </div>
                </div>

                <div className="contato">
                    <h3>Contato</h3>
                    <p>maisarte@gmail.com</p>
                    <p>(13)40028922</p>
                </div>

                <div className="links">
                    <button>Início</button>
                    <button>Destaques</button>
                </div>

            </div>

        </footer>
    );
}

export default Footer;