import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'; 
import styles from './ArtistProfileModal.module.css';
import { IonIcon } from '@ionic/react';
import {
    locationOutline,
    callOutline,
    mailOutline,
    person,
    chatbubblesOutline,
    closeOutline
} from 'ionicons/icons';
import api from '../../services/api';

const ArtistProfileModal = ({ artist, onClose, loggedUser }) => {
    const navigate = useNavigate(); 
    const [isLoading, setIsLoading] = useState(false);
    const [loggedUserData, setLoggedUserData] = useState(null);


    const fetchLoggedUserData = async () => {
        if (!loggedUser) return;
        try {
            const data = await api.get(`/user/${loggedUser?.id}`);
            setLoggedUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchLoggedUserData(); }, [loggedUser]);

    const isOwnProfile = (loggedUser?.id === artist?.user?.id) ||
        (loggedUserData?.id === artist?.user?.id);

    const handleStartChat = async () => {
        if (!loggedUser || !loggedUserData) {
            alert("Você precisa estar logado para conversar.");
            return;
        }

        const artistEmail = artist.user?.email;

        if (!artistEmail) {
            alert("Erro: O artista não possui um email válido cadastrado.");
            return;
        }

        setIsLoading(true);

        try {
            const userId = loggedUserData.id;
    
            const url = `${api.baseUrl}/channels/open?userId=${userId}&otherUserEmail=${artistEmail}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const channelName = await response.text();
                
            
                navigate('/conversations', { 
                    state: { 
                        openAuto: true,
                        channelId: channelName,
                        partnerName: artist.user?.nome || "Artista",
                        partnerEmail: artistEmail
                    } 
                });
            } else {
                const errorText = await response.text();
                alert(`Erro ao iniciar chat: ${errorText}`);
            }

        } catch (error) {
            console.error(error);
            alert("Não foi possível iniciar o chat no momento.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!artist) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>

                <div className={styles.banner}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className={styles.content}>

                    <div className={styles.avatarWrapper}>
                        {artist.user?.profilePhotoUrl ? (
                            <img
                                src={`${api.baseUrl}${artist.user.profilePhotoUrl}`}
                                alt={artist.user.nome}
                            />
                        ) : (
                            <div className={styles.defaultAvatar}>
                                <IonIcon icon={person} />
                            </div>
                        )}
                    </div>

                    <div className={styles.headerInfo}>
                        <h2>{artist.user?.nome}</h2>
                        <span className={styles.badge}>Artista</span>
                    </div>

                    {!isOwnProfile && (
                        <button
                            className={styles.chatBtn}
                            onClick={handleStartChat}
                            disabled={isLoading}
                        >
                            <IonIcon icon={chatbubblesOutline} />
                            {isLoading ? "Abrindo..." : "Conversar"}
                        </button>
                    )}

                    <div className={styles.bioSection}>
                        <p>{artist.biography || "Sem biografia disponível."}</p>
                    </div>

                    <div className={styles.contactContainer}>
                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <IonIcon icon={locationOutline} />
                            </div>
                            <div className={styles.infoText}>
                                <label>Localização</label>
                                <span>{artist.city}</span>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <IonIcon icon={callOutline} />
                            </div>
                            <div className={styles.infoText}>
                                <label>Telefone</label>
                                <span>{artist.phone}</span>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <div className={styles.iconBox}>
                                <IonIcon icon={mailOutline} />
                            </div>
                            <div className={styles.infoText}>
                                <label>E-mail</label>
                                <span>{artist.artistEmail || artist.user?.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ArtistProfileModal;