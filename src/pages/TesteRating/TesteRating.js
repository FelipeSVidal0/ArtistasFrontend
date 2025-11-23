import { useEffect, useState } from "react";
import ArtworkModal from "../../components/ArtworkModal/ArtworkModal";
import "./TesteRating.css";

function TesteRating() {
    const [artworks, setArtworks] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");

    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");

    const [editing, setEditing] = useState(null);
    const [editStars, setEditStars] = useState(0);
    const [editComment, setEditComment] = useState("");

    useEffect(() => {
        fetchArtworks();
        fetchUsers();
    }, []);

    const fetchArtworks = async () => {
        try {
            const res = await fetch("http://localhost:8080/artwork");
            const data = await res.json();
            setArtworks(data.filter(a => a !== null));
        } catch (err) {
            console.error("Erro ao buscar artworks:", err);
        }
    };

    const fetchRatings = async (artworkId) => {
        try {
            const res = await fetch(`http://localhost:8080/rating/${artworkId}`);
            const data = await res.json();
            setRatings(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erro ao buscar ratings:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8080/user");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erro ao buscar users:", err);
        }
    };

    const openArtwork = (artwork) => {
        setSelectedArtwork(artwork);
        fetchRatings(artwork.artWorkId);
        setEditing(null);
        setStars(0);
        setComment("");
    };

    const renderStars = (count, clickable = false, setter = null) => {
        return [1, 2, 3, 4, 5].map(i => (
            <span
                key={i}
                className={i <= count ? "star filled" : "star"}
                onClick={clickable ? () => setter(i) : undefined}
            >
                ★
            </span>
        ));
    };

    const sendRating = async () => {
        if (!userId || !stars) {
            alert("Selecione usuário e estrelas.");
            return;
        }

        try {
            const url =
                `http://localhost:8080/rating/${selectedArtwork.artWorkId}` +
                `?userId=${userId}&stars=${stars}&comment=${encodeURIComponent(comment)}`;

            const res = await fetch(url, { method: "POST" });

            if (res.ok) {
                alert("Avaliação enviada!");
                setStars(0);
                setComment("");
                fetchRatings(selectedArtwork.artWorkId);
                fetchArtworks();
            } else {
                alert("Erro ao enviar avaliação.");
            }
        } catch (err) {
            console.error("Erro:", err);
        }
    };

    const saveEdit = async (ratingId) => {
        try {
            const url =
                `http://localhost:8080/rating/${ratingId}` +
                `?stars=${editStars}&comment=${encodeURIComponent(editComment)}`;

            const res = await fetch(url, { method: "PUT" });

            if (res.ok) {
                alert("Avaliação atualizada!");
                setEditing(null);
                fetchRatings(selectedArtwork.artWorkId);
                fetchArtworks();
            } else {
                alert("Erro ao atualizar.");
            }
        } catch (err) {
            console.error("Erro ao atualizar:", err);
        }
    };

    const deleteRating = async (ratingId) => {
        if (!window.confirm("Deseja realmente excluir esta avaliação?")) return;

        try {
            const res = await fetch(`http://localhost:8080/rating/${ratingId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Avaliação removida!");
                fetchRatings(selectedArtwork.artWorkId);
                fetchArtworks();
            } else {
                alert("Erro ao excluir avaliação.");
            }
        } catch (err) {
            console.error("Erro ao excluir:", err);
        }
    };

    return (
        <div className="rating-wrapper">
            <h1 className="title">Avaliação de Obras</h1>

            <div className="artworks-grid">
                {artworks.map(a => (
                    <div
                        className="art-card"
                        key={a.artWorkId}
                        onClick={() => openArtwork(a)}
                    >
                        {a.contentType === "image" ? (
                            <img src={`http://localhost:8080${a.contentUrl}`} alt={a.title} />
                        ) : (
                            <video src={`http://localhost:8080${a.contentUrl}`} controls />
                        )}

                        <div className="art-info">
                            <h3>{a.title}</h3>
                            <p className="artist-name">{a.artist?.user?.nome}</p>

                            <div className="stars-display">
                                {renderStars(Math.round(a.averageRating))}
                            </div>

                            <p className="avg-text">{a.averageRating.toFixed(1)} ⭐</p>
                        </div>
                    </div>
                ))}
            </div>

            <ArtworkModal
                artwork={selectedArtwork}
                ratings={ratings}
                users={users}

                userId={{ value: userId, set: setUserId }}

                stars={stars}
                setStars={setStars}
                comment={comment}
                setComment={setComment}

                editing={editing}
                setEditing={setEditing}
                editStars={editStars}
                setEditStars={setEditStars}
                editComment={editComment}
                setEditComment={setEditComment}

                renderStars={renderStars}
                onClose={() => setSelectedArtwork(null)}
                onSendRating={sendRating}
                onSaveEdit={saveEdit}
                onDeleteRating={deleteRating}
            />
        </div>
    );
}

export default TesteRating;
