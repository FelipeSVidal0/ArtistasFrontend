import { person } from 'ionicons/icons';
import './Navbar.css';
import { IonIcon } from '@ionic/react';

function Navbar() {

    const isLoggedIn = true;

    return (
        <nav className='navbar'>
            <div className='nav-top'>
                <ul>
                    <li>Início</li>
                    <li>Destaques</li>
                </ul>
            </div>

            <div className='nav-bottom'>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt='Logo do site'></img>
                    <h3>+ARTE</h3>
                </div>


                {isLoggedIn ? (
                    <div className='nav-user-data'>
                        <IonIcon icon={person} />
                        <div>
                            <p>Olá, <span className='nav-username'>Miguel</span></p>
                            <p>miguldalsenter@gmail.com</p>
                        </div>
                    </div>

                ) : (
                    <p>Entrar ou Cadastrar</p>
                )}
            </div>
        </nav>
    )
}

export default Navbar;