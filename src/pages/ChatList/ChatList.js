import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ChatList.module.css';
import { IonIcon } from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import Navbar from '../../components/navbar/Navbar';
import ChatModal from '../../components/ChatModal/ChatModal';
import api from '../../services/api';

const ChatList = () => {
    const location = useLocation();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [loggedUser, setLoggedUser] = useState(() => {
        const saved = localStorage.getItem("LoggedUser");
        return saved ? JSON.parse(saved) : null;
    });
    
    const [loggedUserData, setLoggedUserData] = useState(null);

    useEffect(() => {
        if (location.state?.openAuto && location.state?.channelId) {
            const { channelId, partnerName, partnerEmail } = location.state;
            
            setSelectedChat({
                channelId,
                partnerName,
                partnerEmail
            });
            setIsChatOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const fetchLoggedUserData = async () => {
        if (!loggedUser?.id) return;
        try {
            const data = await api.get(`/user/${loggedUser.id}`);
            setLoggedUserData(data);
        } catch (error) { console.error(error); }
    };
    
    useEffect(() => { fetchLoggedUserData(); }, [loggedUser]);

    useEffect(() => {
        if (loggedUser?.id) fetchChannels();
    }, [loggedUser?.id]);

    const fetchChannels = async () => {
        try {
            const data = await api.get(`/channels/list/${loggedUser.id}`);
            setChannels(data);
        } catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    const handleOpenChat = (channel) => {
        setSelectedChat(channel);
        setIsChatOpen(true);
    };

    if (!loggedUser?.id) return null;

    return (
        <>
            <Navbar
                userName={loggedUserData?.nome}
                userEmail={loggedUserData?.email}
                profilePhotoUrl={loggedUserData?.profilePhotoUrl}
            />

            <div className={styles.container}>
                <h2 className={styles.title}>
                    <IonIcon icon={chatbubbleEllipsesOutline} style={{ marginRight: '10px' }} />
                    Minhas Conversas
                </h2>

                {loading ? (
                    <div className={styles.loading}>Carregando...</div>
                ) : (
                    <div className={styles.list}>
                        {channels.length === 0 ? (
                            <div className={styles.emptyState}>Nenhuma conversa iniciada.</div>
                        ) : (
                            channels.map((channel, index) => (
                                <div
                                    key={channel.channelId || index}
                                    className={styles.chatCard}
                                    onClick={() => handleOpenChat(channel)}
                                >
                                    <div className={styles.avatar}>
                                        {channel.partnerName ? channel.partnerName.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div className={styles.info}>
                                        <div className={styles.name}>{channel.partnerName || "Desconhecido"}</div>
                                        <div className={styles.email}>{channel.partnerEmail}</div>
                                    </div>
                                    <div className={styles.arrow}>›</div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div> 
          
            {selectedChat && (
                <ChatModal
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    channelId={selectedChat.channelId}
                    partnerName={selectedChat.partnerName}
                />
            )}
        </>
    );
};

export default ChatList;