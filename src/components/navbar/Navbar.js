import { person } from 'ionicons/icons';
import './Navbar.css';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom'

const DataProps = {
    userName: String,
    userEmail: String
}

function Navbar({ userName, userEmail, profilePhotoUrl } = DataProps) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('LoggedUser');
        navigate('/');
    };

    return (
        <header>
            <nav className='nav-top'>
                <ul>
                    <div>
                        <li>Início</li>
                        <li>Destaques</li>
                    </div>
                    <div>
                        <li onClick={() => navigate('/artwork')}>Add Obra</li>
                        <li onClick={() => navigate('/rating')}>Avaliar Obra</li>
                        <li onClick={() => navigate('/profile')}>Meu perfil</li>
                        <li onClick={handleLogout}>Sair</li>
                    </div>
                </ul>
            </nav>

            <div className='nav-bottom'>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt='Logo do site'></img>
                    <h3>+ARTE</h3>
                </div>


                <div className='nav-user-data'>

                    {profilePhotoUrl ? (
                        <img
                            src={`http://localhost:8080${profilePhotoUrl}`}
                            alt="Foto de perfil"
                            style={{ width: 55, height: 55, objectFit: "cover", borderRadius: "50%" }}
                        />
                    ) : (
                        <IonIcon className="nav-user-data-icon" icon={person} />
                    )}



                    <div>
                        <p>Olá, <span className='nav-username'>{userName}</span></p>
                        <p>{userEmail}</p>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Navbar;