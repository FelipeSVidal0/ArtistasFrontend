import { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "./ArtworkModal.css";
import ArtistProfileModal from '../ArtistProfileModal/ArtistProfileModal';
import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import api from "../../services/api";

function ArtworkModal({ artwork, onClose, loggedUserId, refreshArtworks }) {

    const [ratings, setRatings] = useState([]);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");
    const [editing, setEditing] = useState(null);
    const [editStars, setEditStars] = useState(0);
    const [editComment, setEditComment] = useState("");
    const [showArtistProfile, setShowArtistProfile] = useState(false);

    const fetchRatings = useCallback(async () => {
        if (!artwork) return;
        try {
            const data = await api.get(`/rating/${artwork.artWorkId}`);
            setRatings(data);
        } catch (error) {
            console.error(error);
        }
    }, [artwork]);

    useEffect(() => {
        if (artwork) {
            fetchRatings();
            setStars(0);
            setComment("");
            setEditing(null);
            setShowArtistProfile(false);
        }
    }, [artwork, fetchRatings]);

    const sendRating = async () => {
        if (!stars) return alert("Selecione estrelas!");
        if (!artwork) return;

        const params = new URLSearchParams();
        params.append('userId', loggedUserId);
        params.append('stars', stars);
        params.append('comment', comment);

        try {
            const url = `/rating/${artwork.artWorkId}?${params.toString()}`;
            const res = await api.post(url);

            if (res.ok) {
                setStars(0);
                setComment("");
                fetchRatings();
                refreshArtworks();
            } else {
                alert("Erro ao enviar avaliação.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveEdit = async (ratingId) => {
        const params = new URLSearchParams();
        params.append('stars', editStars);
        params.append('comment', editComment);

        try {
            const url = `/rating/${ratingId}?${params.toString()}`;
            const res = await api.put(url);

            if (res.ok) {
                setEditing(null);
                fetchRatings();
                refreshArtworks();
            } else {
                alert("Erro ao salvar edição.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRating = async (ratingId) => {
        if (!window.confirm("Deseja realmente excluir esta avaliação?")) return;
        try {
            const res = await api.delete(`/rating/${ratingId}`);
            if (res.ok) {
                fetchRatings();
                refreshArtworks();
            } else {
                alert("Erro ao excluir avaliação.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderStars = (count, clickable = false, setter = null) => {
        return [1, 2, 3, 4, 5].map(i => (
            <span
                key={i}
                className={i <= count ? "star filled" : "star"}
                onClick={clickable ? () => setter(i) : undefined}
                style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
                ★
            </span>
        ));
    };

    if (!artwork) return null;

    const modalHTML = (
        <div className="modal-bg" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={onClose}>×</button>

                <div className="modal-grid">

                    <div className="media-column">
                        <div className="media-container">
                            {artwork.contentType === "image" ? (
                                <img
                                    className="modal-img"
                                    src={`${api.baseUrl}${artwork.contentUrl}`}
                                    alt={`Obra: ${artwork.title}`}
                                />
                            ) : (
                                <video
                                    className="modal-img"
                                    src={`${api.baseUrl}${artwork.contentUrl}`}
                                    controls
                                />
                            )}
                        </div>

                        <div className="artwork-info">
                            <h2>{artwork.title}</h2>

                            <div
                                className="artistRow"
                                onClick={() => setShowArtistProfile(true)}
                                title="Ver perfil do artista"
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <IonIcon icon={personCircleOutline} />
                                <span className="artistName">
                                    {artwork.artist?.user?.nome || "Artista Desconhecido"}
                                </span>
                            </div>

                            <div className="modal-rating-summary">
                                <h4>Média de Avaliação</h4>
                                <div className="rating-display">
                                    <span className="rating-value">
                                        {Number(artwork.averageRating || 0).toFixed(1).replace(".", ",")}
                                    </span>
                                    {renderStars(Math.round(artwork.averageRating || 0))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="comments-column">

                        <div className="rate-box">
                            <h3>Deixe sua avaliação</h3>

                            <label>Estrelas:</label>
                            <div className="click-stars">
                                {renderStars(stars, true, setStars)}
                            </div>

                            <label>Comentário:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Escreva sua opinião sobre a obra..."
                            />

                            <button className="send-btn" onClick={sendRating}>Enviar Avaliação</button>
                        </div>

                        <div className="comments-box">
                            <h3>Avaliações ({ratings.length})</h3>

                            {ratings.length === 0 && <p className="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>}

                            {ratings.map(r => (
                                <div className="comment-card" key={r.ratingId}>
                                    <div className="comment-header">
                                        <div className="avatar">
                                            {r.user.nome ? r.user.nome[0].toUpperCase() : "?"}
                                        </div>
                                        <div>
                                            <p className="username">{r.user.nome}</p>
                                            <p className="date">Avaliado em {new Date(r.ratingDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {editing === r.ratingId ? (
                                        <>
                                            <div className="click-stars edit-stars-container">
                                                {renderStars(editStars, true, setEditStars)}
                                            </div>

                                            <textarea
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                            />

                                            <div className="comment-actions">
                                                <button className="send-btn save-btn" onClick={() => saveEdit(r.ratingId)}>Salvar</button>
                                                <button className="delete-btn" onClick={() => setEditing(null)}>Cancelar</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="rating-comment-display">
                                                {renderStars(r.stars)}
                                            </div>

                                            <p className="comment-text">{r.comment}</p>

                                            {String(loggedUserId) === String(r.user.id) && (
                                                <div className="comment-actions">
                                                    <button className="edit-btn" onClick={() => {
                                                        setEditing(r.ratingId);
                                                        setEditStars(r.stars);
                                                        setEditComment(r.comment);
                                                    }}>
                                                        Editar
                                                    </button>
                                                    <button className="delete-btn" onClick={() => deleteRating(r.ratingId)}>Excluir</button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {showArtistProfile && (
                        <ArtistProfileModal
                            artist={artwork.artist}
                            loggedUser={{ id: loggedUserId }}
                            onClose={() => setShowArtistProfile(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalHTML, document.body);
}

export default ArtworkModal;


