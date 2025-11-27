import Navbar from "../../components/navbar/Navbar";
import styles from "./Home.module.css";
import { IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import ArtworkModal from "../../components/ArtworkModal/ArtworkModal";
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../services/api"; 

function Home() {

    const location = useLocation();
    const navigate = useNavigate();

    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loggedUserData, setLoggedUserData] = useState(null);

    const [loggedUser, setLoggedUser] = useState(() => {
        const saved = localStorage.getItem("LoggedUser");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (location.state?.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
                window.history.replaceState({}, document.title);
            }
        }
    }, [location]);

    const fetchArtworks = async () => {
        try {
            const data = await api.get("/artwork");
            setArtworks(data.filter(a => a !== null));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchLoggedUserData = async () => {
        if (!loggedUser?.id) return;
        try {
            const data = await api.get(`/user/${loggedUser.id}`);
            setLoggedUserData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { fetchLoggedUserData(); }, [loggedUser]);
    useEffect(() => { fetchArtworks(); }, []);

    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleDateString("pt-BR");
    };

    const filteredArtworks = artworks
        .filter(artwork => {
            if (selectedFilter === "all") return true;
            const rating = Math.floor(Number(artwork.averageRating) || 0);
            return rating === Number(selectedFilter);
        })
        .sort((a, b) => {
            const ratingA = Number(a.averageRating) || 0;
            const ratingB = Number(b.averageRating) || 0;
            return ratingB - ratingA;
        });

    return (
        <>
            <div className={styles.wrapper}>
                <Navbar
                    userName={loggedUserData?.nome}
                    userEmail={loggedUserData?.email}
                    profilePhotoUrl={loggedUserData?.profilePhotoUrl}
                />

                <main className={styles.mainContent}>

                    <section className={styles.headline} id="inicio">
                        <div>
                            <h1>Onde sua arte <br /> encontra o mundo!</h1>
                            <h5>Para quem faz da arte sua voz e da criatividade seu estilo</h5>
                        </div>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/headline-img.svg`} alt="Headline" />
                        </div>
                        <img className={styles.triangulo} src={`${process.env.PUBLIC_URL}/triangulo.png`} alt="Triangulo" />
                    </section>

                    <section className={styles.containerArtisticAxes}>

                        <div
                            className={styles.cardArtisticAxes}
                            onClick={() => navigate('/artworks', {
                                state: {
                                    categoryLabel: 'Música',
                                    categoryEnum: 'MUSICA',
                                    categoryImage: `${process.env.PUBLIC_URL}/musica.png`
                                }
                            })}
                        >
                            <div>
                                <p>Transforme sons em emoção!</p>
                                <p>Música</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/musica.png`} alt="Música" />
                        </div>

                        <div
                            className={styles.cardArtisticAxes}
                            onClick={() => navigate('/artworks', {
                                state: {
                                    categoryLabel: 'Artesanato',
                                    categoryEnum: 'ARTESANATO',
                                    categoryImage: `${process.env.PUBLIC_URL}/artesanato.png`
                                }
                            })}
                        >
                            <div>
                                <p>Crie com as mãos, inspire com o coração!</p>
                                <p>Artesanato</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/artesanato.png`} alt="Artesanato" />
                        </div>

                        <div
                            className={styles.cardArtisticAxes}
                            onClick={() => navigate('/artworks', {
                                state: {
                                    categoryLabel: 'Audiovisual',
                                    categoryEnum: 'AUDIOVISUAL',
                                    categoryImage: `${process.env.PUBLIC_URL}/audiovisual.png`
                                }
                            })}
                        >
                            <div>
                                <p>Histórias que ganham vida na tela!</p>
                                <p>Audiovisual</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/audiovisual.png`} alt="Audiovisual" />
                        </div>

                        <div
                            className={styles.cardArtisticAxes}
                            onClick={() => navigate('/artworks', {
                                state: {
                                    categoryLabel: 'Pinturas & Desenhos',
                                    categoryEnum: 'DESENHOS_E_PINTURAS',
                                    categoryImage: `${process.env.PUBLIC_URL}/desenho.png`
                                }
                            })}
                        >
                            <div>
                                <p>Quando o traço vira expressão!</p>
                                <p>Pinturas &<br /> Desenhos</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/desenho.png`} alt="Desenho" />
                        </div>

                    </section>

                    <div className={styles["label-destaques"]} id="destaques">

                        <h4>Obras em destaque</h4>

                        <div className={styles["boxes-estrelas"]}>
                            <input
                                type="radio"
                                id="btnT"
                                name="grupo"
                                hidden
                                checked={selectedFilter === "all"}
                                onChange={() => setSelectedFilter("all")}
                            />
                            <label htmlFor="btnT" className={styles["box-estrelas"]}>
                                Todos
                            </label>

                            <input
                                type="radio"
                                id="btn5"
                                name="grupo"
                                hidden
                                checked={selectedFilter === 5}
                                onChange={() => setSelectedFilter(5)}
                            />
                            <label htmlFor="btn5" className={styles["box-estrelas"]}>
                                5 <IonIcon icon={star} />
                            </label>

                            <input
                                type="radio"
                                id="btn4"
                                name="grupo"
                                hidden
                                checked={selectedFilter === 4}
                                onChange={() => setSelectedFilter(4)}
                            />
                            <label htmlFor="btn4" className={styles["box-estrelas"]}>
                                4 <IonIcon icon={star} />
                            </label>

                            <input
                                type="radio"
                                id="btn3"
                                name="grupo"
                                hidden
                                checked={selectedFilter === 3}
                                onChange={() => setSelectedFilter(3)}
                            />
                            <label htmlFor="btn3" className={styles["box-estrelas"]}>
                                3 <IonIcon icon={star} />
                            </label>

                            <input
                                type="radio"
                                id="btn2"
                                name="grupo"
                                hidden
                                checked={selectedFilter === 2}
                                onChange={() => setSelectedFilter(2)}
                            />
                            <label htmlFor="btn2" className={styles["box-estrelas"]}>
                                2 <IonIcon icon={star} />
                            </label>

                            <input
                                type="radio"
                                id="btn1"
                                name="grupo"
                                hidden
                                checked={selectedFilter === 1}
                                onChange={() => setSelectedFilter(1)}
                            />
                            <label htmlFor="btn1" className={styles["box-estrelas"]}>
                                1 <IonIcon icon={star} />
                            </label>
                        </div>
                    </div>

                    <div className={styles["container-cards"]}>

                        {filteredArtworks.length > 0 ? (
                            filteredArtworks.map(artwork => (
                                <div
                                    className={styles.card}
                                    key={artwork.artWorkId}
                                    onClick={() => setSelectedArtwork(artwork)}
                                >
                                    {artwork.contentType === "image" ? (
                                        <img 
                                            src={`${api.baseUrl}${artwork.contentUrl}`} 
                                            alt={artwork.title} 
                                        />
                                    ) : (
                                        <video
                                            src={`${api.baseUrl}${artwork.contentUrl}`}
                                            controls
                                        />
                                    )}

                                    <div className={styles["card-top"]}>
                                        <p className={styles["nome-obra"]}>{artwork.title}</p>
                                        <p className={styles["nome-autor"]}>{artwork.artist?.user?.nome}</p>
                                    </div>

                                    <div className={styles["card-bottom"]}>
                                        <p className={styles["data-obra"]}>{formatDate(artwork.publishDate)}</p>

                                        <div className={styles.avaliacao}>
                                            <p className={styles["numero-estrela"]}>
                                                {(Number(artwork.averageRating) || 0)
                                                    .toFixed(1)
                                                    .replace(".", ",")}
                                            </p>
                                            <IonIcon icon={star} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noResults}>
                                Nenhuma obra encontrada com essa avaliação.
                            </p>
                        )}
                    </div>

                </main>

                <Footer />
            </div>

            <ArtworkModal
                artwork={selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
                loggedUserId={loggedUser?.id}
                refreshArtworks={fetchArtworks}
            />
        </>
    );
}

export default Home;