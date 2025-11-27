import styles from "./Footer.module.css";
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();

    const handleScroll = (id) => {
        navigate('/home', { state: { scrollTo: id } });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                
                <div className={styles.logoSection}>
                    <img 
                        src={`${process.env.PUBLIC_URL}/logo-grande.png`} 
                        alt='Logo +ARTE' 
                    />
                    <div className={styles.logoTexto}>
                        <h3>+ARTE</h3>
                        <p>Para Quem Vive a Arte!</p>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h3>Contato</h3>
                    <p>maisarte@example.com</p>
                    <p>(47) 12345-6789</p>
                </div>

                <div className={styles.linksSection}>
                    <h3>Navegação</h3>
                    <div className={styles.buttons}>
                        <button onClick={() => handleScroll("inicio")}>Início</button>
                        <button onClick={() => handleScroll("destaques")}>Destaques</button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;