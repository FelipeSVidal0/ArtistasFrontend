import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { usePubNub } from 'pubnub-react';
import styles from './ChatModal.module.css';
import { IonIcon } from "@ionic/react";
import { send, closeOutline } from "ionicons/icons";
import api from '../../services/api';

const ChatModal = ({ isOpen, onClose, channelId, partnerName }) => {
    const pubnub = usePubNub();
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.setProperty('overflow', 'hidden', 'important');
            document.body.style.setProperty('overflow', 'hidden', 'important');
            document.documentElement.style.setProperty('height', '100vh', 'important');
            document.body.style.setProperty('height', '100vh', 'important');
        } else {
            document.documentElement.style.removeProperty('overflow');
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('height');
            document.body.style.removeProperty('height');
        }
        return () => {
            document.documentElement.style.removeProperty('overflow');
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('height');
            document.body.style.removeProperty('height');
        };
    }, [isOpen]);

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 2147483647, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',     
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    };

    const modalContainerStyle = {
        width: '90%',
        maxWidth: '500px',
        height: '80vh',
        backgroundColor: '#fff',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        margin: 'auto', 
        animation: 'none'
    };

    useEffect(() => {
        if (!isOpen) return;
        const fetchUserData = async () => {
            const savedUser = localStorage.getItem("LoggedUser");
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    const data = await api.get(`/user/${parsedUser.id}`);
                    setUserData(data);
                } catch (error) { console.error(error); }
            }
        };
        fetchUserData();
    }, [isOpen]);

    useEffect(() => {
        if (!userData || !channelId || !isOpen) return;

        pubnub.setUUID(userData.email);
        setMessages([]);
        pubnub.subscribe({ channels: [channelId] });

        const listener = {
            message: (envelope) => setMessages((prev) => [...prev, envelope.message])
        };
        pubnub.addListener(listener);

        const fetchHistory = async () => {
            try {
                const result = await pubnub.fetchMessages({ channels: [channelId], count: 20 });
                if (result.channels && result.channels[channelId]) {
                    setMessages(result.channels[channelId].map(item => item.message));
                }
            } catch (error) { console.error(error); }
        };
        fetchHistory();

        return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribeAll();
        };
    }, [pubnub, channelId, userData, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && channelId && userData) {
            const payload = {
                text: inputMessage,
                sender: userData.email,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            pubnub.publish({ channel: channelId, message: payload });
            setInputMessage('');
        }
    };

    const isMe = (senderEmail) => userData?.email === senderEmail;

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <div className={styles.avatar}>
                            {partnerName ? partnerName.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span className={styles.headerTitle}>{partnerName || 'Chat'}</span>
                    </div>
                    <button onClick={onClose} className={styles.closeBtn}>
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>

                <div className={styles.chatArea}>
                    {messages.map((msg, index) => {
                        const messageFromMe = isMe(msg.sender);
                        return (
                            <div key={index} className={`${styles.messageRow} ${messageFromMe ? styles.rowRight : styles.rowLeft}`}>
                                <div className={`${styles.bubble} ${messageFromMe ? styles.bubbleMe : styles.bubbleThem}`}>
                                    <div className={styles.msgText}>{msg.text}</div>
                                    <div className={`${styles.msgTime} ${messageFromMe ? styles.timeMe : styles.timeThem}`}>
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className={styles.inputArea}>
                    <input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className={styles.msgInput}
                        placeholder="Digite uma mensagem..."
                        disabled={!userData}
                    />
                    <button type="submit" className={styles.sendBtn} disabled={!inputMessage.trim() || !userData}>
                        <IonIcon icon={send} />
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default ChatModal;