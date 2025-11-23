import "./ArtworkModal.css";

function ArtworkModal({
    artwork,
    ratings,
    users,
    userId,
    stars,
    setStars,
    comment,
    setComment,
    editing,
    setEditing,
    editStars,
    setEditStars,
    editComment,
    setEditComment,
    onClose,
    onSendRating,
    onSaveEdit,
    onDeleteRating,
    renderStars,
}) {
    if (!artwork) return null;

    return (
        <div className="modal-bg" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                {/* HEADER */}
                <h2>{artwork.title}</h2>
                <p className="artist-name">{artwork.artist?.user?.nome}</p>

                {/* IMAGE / VIDEO */}
                {artwork.contentType === "image" ? (
                    <img
                        className="modal-img"
                        src={`http://localhost:8080${artwork.contentUrl}`}
                        alt=""
                    />
                ) : (
                    <video
                        className="modal-img"
                        src={`http://localhost:8080${artwork.contentUrl}`}
                        controls
                    />
                )}

                {/* MÉDIA */}
                <div className="modal-rating">
                    <h3>Média: {artwork.averageRating.toFixed(1)} ⭐</h3>
                    <div>{renderStars(Math.round(artwork.averageRating))}</div>
                </div>

                {/* FORMULÁRIO DE AVALIAÇÃO */}
                <div className="rate-box">
                    <h3>Deixe sua avaliação</h3>

                    <label>Usuário:</label>
                    <select value={userId.value} onChange={(e) => userId.set(e.target.value)}>
                        <option value="">Selecione</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.nome} ({u.email})
                            </option>
                        ))}
                    </select>

                    <label>Estrelas:</label>
                    <div className="click-stars">
                        {renderStars(stars, true, setStars)}
                    </div>

                    <label>Comentário:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Escreva algo..."
                    />

                    <button className="send-btn" onClick={onSendRating}>Enviar</button>
                </div>

                {/* LISTA DE AVALIAÇÕES */}
                <div className="comments-box">
                    <h3>Avaliações</h3>

                    {ratings.length === 0 && <p>Nenhuma avaliação ainda.</p>}

                    {ratings.map(r => (
                        <div className="comment-card" key={r.ratingId}>
                            <div className="comment-header">
                                <div className="avatar">{r.user.nome[0].toUpperCase()}</div>
                                <div>
                                    <p className="username">{r.user.nome}</p>
                                    <p className="date">{r.ratingDate}</p>
                                </div>
                            </div>

                            {/* MODO EDIÇÃO */}
                            {editing === r.ratingId ? (
                                <>
                                    <div className="click-stars">
                                        {renderStars(editStars, true, setEditStars)}
                                    </div>

                                    <textarea
                                        value={editComment}
                                        onChange={(e) => setEditComment(e.target.value)}
                                    />

                                    <div className="comment-actions">
                                        <button className="send-btn" onClick={() => onSaveEdit(r.ratingId)}>
                                            Salvar
                                        </button>
                                        <button className="delete-btn" onClick={() => setEditing(null)}>
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="comment-stars">
                                        {renderStars(r.stars)}
                                    </div>

                                    <p className="comment-text">{r.comment}</p>

                                    {/* Apenas o autor */}
                                    {String(userId.value) === String(r.user.id) && (
                                        <div className="comment-actions">
                                            <button className="edit-btn" onClick={() => setEditing(r.ratingId)}>
                                                Editar
                                            </button>
                                            <button className="delete-btn" onClick={() => onDeleteRating(r.ratingId)}>
                                                Excluir
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtworkModal;
