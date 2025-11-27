import styles from "./ListaObras.module.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ArtworkModal from "../../components/ArtworkModal/ArtworkModal";
import api from "../../services/api";

function ListaObras() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        categoryLabel = "Geral",
        categoryEnum = "TODOS",
        categoryImage = ""
    } = location.state || {};

    const [loggedUser] = useState(() => {
        const saved = localStorage.getItem("LoggedUser");
        return saved ? JSON.parse(saved) : null;
    });

    const [loggedUserData, setLoggedUserData] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    const fetchLoggedUserData = useCallback(async () => {
        if (!loggedUser?.id) return;
        try {
            const data = await api.get(`/user/${loggedUser.id}`);
            setLoggedUserData(data);
        } catch (error) {
            console.error(error);
        }
    }, [loggedUser]);

    const fetchArtworks = useCallback(async () => {
        try {
            const data = await api.get("/artwork");

            const safeData = Array.isArray(data) ? data : [];

            const filtered = safeData.filter(artwork =>
                artwork && (categoryEnum === "TODOS" || artwork.type === categoryEnum)
            );

            const sorted = filtered.sort((a, b) => {
                const ratingA = Number(a.averageRating) || 0;
                const ratingB = Number(b.averageRating) || 0;
                return ratingB - ratingA;
            });

            setArtworks(sorted);
        } catch (err) {
            console.error(err);
        }
    }, [categoryEnum]);

    useEffect(() => {
        fetchLoggedUserData();
        fetchArtworks();
    }, [fetchLoggedUserData, fetchArtworks]);

    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleDateString("pt-BR");
    };

    return (
        <div className={styles.wrapper}>
            <Navbar
                userName={loggedUserData?.nome}
                userEmail={loggedUserData?.email}
                profilePhotoUrl={loggedUserData?.profilePhotoUrl}
            />

            <main className={styles.listaObras}>

                <div className={styles.listCateg}>
                    <h1>Categoria: </h1>
                    <div className={styles.Categ}>
                        <h1>{categoryLabel}</h1>
                        {categoryImage && <img src={categoryImage} alt={categoryLabel} />}
                    </div>
                </div>

                <div className={styles.listCardsContainer}>

                    {artworks.length > 0 ? (
                        artworks.map((artwork) => (
                            <div className={styles.cards} key={artwork.artWorkId}>

                                <div className={styles.leftCards}>
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
                                </div>

                                <div className={styles.middleCards}>
                                    <div className={styles.cardsText}>
                                        <h4 className={styles.nomeObra}>{artwork.title}</h4>
                                        <p className={styles.descricao}>
                                            {artwork.description || "Sem descrição disponível."}
                                        </p>
                                    </div>

                                    <div className={styles.avaliacaoObra}>
                                        <p>
                                            {(Number(artwork.averageRating) || 0)
                                                .toFixed(1)
                                                .replace(".", ",")}
                                        </p>
                                        <IonIcon icon={star} />
                                    </div>
                                </div>

                                <div className={styles.rightCards}>
                                    <p className={styles.dataObra}>{formatDate(artwork.publishDate)}</p>

                                    <div className={styles.cardsBtns}>
                                        <button
                                            className={styles.listVerMais}
                                            onClick={() => setSelectedArtwork(artwork)}
                                        >
                                            Ver mais
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <h3>Nenhuma obra encontrada nesta categoria.</h3>
                            <button
                                className={styles.btnVoltar}
                                onClick={() => navigate('/home')}
                            >
                                Voltar para Home
                            </button>
                        </div>
                    )}

                </div>

            </main>

            <Footer />

            <ArtworkModal
                artwork={selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
                loggedUserId={loggedUser?.id}
                refreshArtworks={fetchArtworks}
            />
        </div>
    )
}

export default ListaObras;