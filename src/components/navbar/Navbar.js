import { person } from 'ionicons/icons';
import './Navbar.css';
import { IonIcon } from '@ionic/react';

function Navbar() {

    const isLoggedIn = false;

    return (
        <header>
            <nav className='nav-top'>
                <ul>
                    <li>Início</li>
                    <li>Destaques</li>
                </ul>
            </nav>

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
                    <div className='nav-user'>
                        <button className='LogIn'>Entrar</button>
                        <p>ou</p>
                        <button className='SignUp'>Cadastrar</button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar;