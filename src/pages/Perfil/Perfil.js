import styles from "./Perfil.module.css"
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PostArtworkModal from "../../components/PostArtworkModal/PostArtworkModal";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import api from "../../services/api";

import { IonIcon } from '@ionic/react';
import {
    star,
    createOutline,
    settingsOutline,
    peopleOutline,
    trashOutline,
    person,
    locationOutline,
    callOutline,
    mailOutline
} from 'ionicons/icons';
import { useEffect, useState } from "react";
import ArtworkModal from "../../components/ArtworkModal/ArtworkModal";
import { useNavigate } from "react-router-dom";
import BecomeArtistModal from "../../components/BecomeArtistModal/BecomeArtistModal";

function Perfil() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [loggedUser, setLoggedUser] = useState(() => {
        const saved = localStorage.getItem("LoggedUser");
        return saved ? JSON.parse(saved) : null;
    });

    const [loggedUserData, setLoggedUserData] = useState(null)

    const fetchLoggedUserData = async () => {
        if (!loggedUser || !loggedUser.id) return;
        try {
            const data = await api.get(`/user/${loggedUser.id}`);
            setLoggedUserData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const [isArtist, setIsArtist] = useState(false);
    const [artistData, setArtistData] = useState(null)

    const fetchIsArtist = async () => {
        if (!loggedUser?.id) return;

        try {
            const data = await api.get(`/user/${loggedUser.id}/isArtist`);
            setIsArtist(data.isArtist)
            if (data.isArtist) {
                setArtistData(data.artist);
            }

        } catch (err) {
            console.error(err);
        }
    };

    const [artworks, setArtworks] = useState([])

    const fetchArtworks = async () => {
        try {
            const data = await api.get(`/artwork/artist/${artistData?.artistId}`);
            setArtworks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLoggedUserData();
        fetchIsArtist();
    }, [loggedUser]);

    useEffect(() => {
        if (isArtist && artistData?.artistId) {
            fetchArtworks(artistData.artistId);
        }
    }, [isArtist, artistData]);

    const deleteArtwork = async (artWorkId) => {
        try {
            const res = await fetch(`${api.baseUrl}/artwork/${artWorkId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                alert("Erro ao deletar obra: ", res.status);
                return false;
            }

            alert("Obra deletada com sucesso!");
            fetchArtworks();
            return true;

        } catch (error) {
            console.error("Erro ao deletar obra:", error);
            return false;
        }
    };


    const handleEditProfile = () => {
        setShowEditModal(true);
    };

    const [showBecomeArtistModal, setOpenBecomeArtistModal] = useState(false);
    const openModal = () => setOpenBecomeArtistModal(true);
    const closeModal = () => setOpenBecomeArtistModal(false);

    const handleSaveProfile = async (newProfileData) => {
        setLoggedUserData(prev => ({ ...prev, ...newProfileData }));
        alert("Perfil atualizado com sucesso!");
        setShowEditModal(false);
    };


    const handleDeleteAccount = async () => {
        try {
            const res = await fetch(`${api.baseUrl}/user/${loggedUser.id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                alert("Erro ao excluir sua conta.");
                return;
            }

            localStorage.removeItem("LoggedUser");
            alert("Conta excluída com sucesso!");
            navigate('/')

        } catch (err) {
            console.error("Erro ao excluir conta:", err);
        }
    };

    const handleArtistSubmit = async (formData) => {
        if (!loggedUser || !loggedUser.id) {
            alert("Erro: Usuário não identificado.");
            return;
        }

        const artistPayload = {
            artistEmail: formData.artistEmail,
            phone: formData.phone,
            city: formData.city,
            biography: formData.biography,
            user: {
                id: loggedUser.id
            }
        };

        try {
            const res = await api.post("/artist", artistPayload);

            if (res.ok) {
                alert("Parabéns! Agora você é um Artista.");
                closeModal();
                fetchIsArtist();
            } else {
                console.error("Erro no cadastro:", res.status);
                alert("Erro ao cadastrar artista. Verifique os dados.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const [selectedArtwork, setSelectedArtwork] = useState(null);

    return (
        <div className={styles.wrapper}>
            <Navbar
                userName={loggedUserData?.nome}
                userEmail={loggedUserData?.email}
                profilePhotoUrl={loggedUserData?.profilePhotoUrl}
            />

            <main className={styles.mainContent}>
                <section className={styles.artist}>

                    <div className={styles.view}>
                        <div className={styles.photoContainer}>
                            {loggedUserData?.profilePhotoUrl ? (
                                <img
                                    src={`${api.baseUrl}${loggedUserData?.profilePhotoUrl}`}
                                    alt="Foto de perfil"
                                />
                            ) : (
                                <IonIcon className="personIcon" icon={person} style={{ color: "#ccc", fontSize: "85px" }} />
                            )}
                        </div>
                    </div>

                    <div className={styles.artistInfo}>
                        <div className={styles.header}>
                            <h1 className={styles.artistName}>{loggedUserData?.nome}</h1>
                            <button
                                className={styles.editProfileBtn}
                                onClick={handleEditProfile}
                                aria-label="Editar Perfil"
                            >
                                <IonIcon icon={createOutline} />
                                Editar Perfil
                            </button>
                        </div>

                        <div className={styles.infoRow}>
                            <div className={styles.categoryBadge}>
                                {isArtist ? "Artista" : "Padrão"}
                            </div>
                        </div>

                        {isArtist && (
                            <>
                                <div className={styles.contactInfo}>
                                    <div className={styles.contactItem}>
                                        <IonIcon icon={locationOutline} />
                                        <span className={styles.label}>Cidade:</span>
                                        <span>{artistData?.city}</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <IonIcon icon={callOutline} />
                                        <span className={styles.label}>Telefone:</span>
                                        <span>{artistData?.phone}</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <IonIcon icon={mailOutline} />
                                        <span className={styles.label}>Email:</span>
                                        <span>{artistData?.artistEmail}</span>
                                    </div>
                                </div>
                                <p className={styles.artistBio}>
                                    {artistData?.biography}
                                </p>
                            </>
                        )}
                    </div>
                </section>

                {isArtist && (
                    <section className={styles.pieces}>
                        <div className={styles.top}>
                            <h2>Minhas Obras</h2>

                            <button className={styles.boxAdd} onClick={() => setOpen(true)}>
                                <h3>+</h3>
                                <p>Adicionar Obra</p>
                            </button>
                        </div>

                        <div className={styles.cardsContainer}>
                            {artworks.length > 0 ? (
                                artworks.map((artwork) => (
                                    <div
                                        key={artwork.artWorkId}
                                        className={styles.card}
                                    >
                                        <div className={styles.leftCard}>
                                            {artwork.contentType === "image" ? (
                                                <img
                                                    src={`${api.baseUrl}${artwork.contentUrl}`}
                                                    alt={`Obra: ${artwork.title}`}
                                                />
                                            ) : (

                                                <video
                                                    src={`${api.baseUrl}${artwork.contentUrl}`}
                                                    controls
                                                />
                                            )}
                                        </div>

                                        <div className={styles.middleCard}>
                                            <h4 className={styles.nomeObra}>{artwork.title}</h4>
                                            <p className={styles.descricao}>
                                                {artwork.description?.length > 150
                                                    ? artwork.description.substring(0, 150) + '...'
                                                    : (artwork.description || "Descrição não fornecida para esta obra.")}
                                            </p>

                                            <div className={styles.avaliacaoObra}>
                                                <IonIcon icon={star} />
                                                <p>
                                                    {(Number(artwork.averageRating) || 0)
                                                        .toFixed(1)
                                                        .replace(".", ",")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={styles.rightCard}>
                                            <span className={styles.dataObra}>
                                                Postado em: {formatDate(artwork.publishDate)}
                                            </span>
                                            <div className={styles.cardBtns}>
                                                <button
                                                    className={styles.verMais}
                                                    onClick={(e) => { e.stopPropagation(); setSelectedArtwork(artwork); }}
                                                >
                                                    Ver Mais
                                                </button>
                                                <button
                                                    className={styles.lixeira}
                                                    onClick={(e) => { e.stopPropagation(); deleteArtwork(artwork.artWorkId); }}
                                                    aria-label="Excluir Obra"
                                                >
                                                    <IonIcon icon={trashOutline} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma obra encontrada. Clique em "Adicionar Obra" para começar.</p>
                            )}
                        </div>
                    </section>
                )}
                <div className={styles.settingsLayout}>

                    {!isArtist && (
                        <section className={styles.statusSection}>
                            <div className={styles.statusHeader}>
                                <IonIcon icon={peopleOutline} className={styles.statusIcon} />
                                <h2>Torne-se um Artista</h2>
                            </div>
                            <p className={styles.statusDescription}>
                                Sua conta está atualmente no modo "Padrão". Torne-se um Artista para começar a postar suas obras, receber avaliações e construir seu portfólio.
                            </p>
                            <button
                                className={styles.becomeArtistBtn}
                                onClick={openModal}
                            >
                                Quero Ser Artista
                            </button>
                        </section>
                    )}

                    <section className={styles.accountSettings}>
                        <div className={styles.settingsHeader}>
                            <IonIcon icon={settingsOutline} className={styles.settingsIcon} />
                            <h2>Configurações da Conta</h2>
                        </div>

                        <p className={styles.settingsDescription}>
                            Excluir sua conta é uma ação irreversível e apagará permanentemente todos os seus dados.
                        </p>
                        <button
                            className={styles.deleteAccountBtn}
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Excluir Perfil
                        </button>
                    </section>

                </div>

            </main>

            <Footer />

            {open && (<PostArtworkModal artistData={artistData} refreshArtworks={fetchArtworks} onClose={() => setOpen(false)} />)}

            {
                showEditModal ? (
                    <EditProfileModal
                        loggedUserData={loggedUserData}
                        onClose={() => setShowEditModal(false)}
                        onSave={handleSaveProfile}
                        artistData={artistData}
                        refreshIsArtist={fetchIsArtist}
                        refreshUser={fetchLoggedUserData}
                    />
                ) : null
            }

            {
                showDeleteConfirm && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.deleteConfirmModal}>
                            <h3>Confirmar Exclusão</h3>
                            <p>Tem certeza de que deseja excluir permanentemente sua conta?</p>
                            <div className={styles.modalActions}>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className={styles.confirmDeleteBtn}
                                    onClick={handleDeleteAccount}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


            <ArtworkModal
                artwork={selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
                loggedUserId={loggedUser.id}
                refreshArtworks={fetchArtworks}
            />

            <BecomeArtistModal
                isOpen={showBecomeArtistModal}
                onClose={closeModal}
                onSubmit={handleArtistSubmit}
            />
        </div >
    )
}

export default Perfil;