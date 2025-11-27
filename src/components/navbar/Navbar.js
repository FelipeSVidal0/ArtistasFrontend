import { person, menu, close } from 'ionicons/icons';
import styles from './Navbar.module.css';
import { IonIcon } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ userName, userEmail, profilePhotoUrl }) {

    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('LoggedUser');
        navigate('/');
        setIsDrawerOpen(false);
    };

    const handleNavigate = (path, state = {}) => {
        navigate(path, state);
        setIsDrawerOpen(false);
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles["nav-top"]}>
                    <ul>
                        <div>
                            <li onClick={() => handleNavigate('/home', { state: { scrollTo: "inicio" } })}>Início</li>
                            <li onClick={() => handleNavigate('/home', { state: { scrollTo: "destaques" } })}>Destaques</li>
                        </div>
                        <div>
                            <li onClick={() => handleNavigate('/conversations')}>Conversas</li>
                            <li onClick={() => handleNavigate('/profile')}>Meu perfil</li>
                            <li onClick={handleLogout}>Sair</li>
                        </div>
                    </ul>
                </nav>

                <div className={styles["nav-bottom"]}>
                    <div onClick={() => handleNavigate('/home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt='Logo do site' style={{ height: '40px' }} />
                        <h3>+ARTE</h3>
                    </div>

                    <div className={styles["nav-user-data"]}>
                        {profilePhotoUrl ? (
                            <img
                                src={`http://localhost:8080${profilePhotoUrl}`}
                                alt="Foto de perfil"
                                style={{ width: 55, height: 55, objectFit: "cover", borderRadius: "50%" }}
                            />
                        ) : (
                            <IonIcon className={styles["nav-user-data-icon"]} icon={person} />
                        )}

                        <div>
                            <p>Olá, <span className={styles["nav-username"]}>{userName || 'Visitante'}</span></p>
                            <p>{userEmail}</p>
                        </div>
                    </div>

                    <IonIcon
                        icon={menu}
                        className={styles.hamburgerBtn}
                        onClick={() => setIsDrawerOpen(true)}
                    />
                </div>
            </header>

            <div
                className={`${styles.overlay} ${isDrawerOpen ? styles.open : ''}`}
                onClick={() => setIsDrawerOpen(false)}
            />

            <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>

                <div className={styles.drawerHeader}>
                    <h3>Menu</h3>
                    <IonIcon icon={close} onClick={() => setIsDrawerOpen(false)} />
                </div>

                <div className={styles.drawerProfile}>
                    {profilePhotoUrl ? (
                        <img
                            src={`http://localhost:8080${profilePhotoUrl}`}
                            alt="Foto"
                        />
                    ) : (
                        <IonIcon icon={person} />
                    )}
                    <div>
                        <strong>{userName || 'Visitante'}</strong>
                        <span>{userEmail}</span>
                    </div>
                </div>

                <ul className={styles.drawerList}>
                    <li onClick={() => handleNavigate('/home', { state: { scrollTo: "inicio" } })}>Início</li>
                    <li onClick={() => handleNavigate('/home', { state: { scrollTo: "destaques" } })}>Destaques</li>
                    <li onClick={() => handleNavigate('/conversations')}>Conversas</li>
                    <li onClick={() => handleNavigate('/profile')}>Meu Perfil</li>
                    <li className={styles.logoutItem} onClick={handleLogout}>Sair</li>
                </ul>
            </aside>
        </>
    )
}

export default Navbar;