import React, { useState } from 'react';
import styles from './BecomeArtistModal.module.css';

const BecomeArtistModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        artistEmail: '',
        phone: '',
        city: '',
        biography: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>

                <div className={styles.header}>
                    <h2>Dados do Artista</h2>
                    <button onClick={onClose} className={styles.closeBtn}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>
                        <label htmlFor="artistEmail">Email Profissional</label>
                        <input
                            type="email"
                            id="artistEmail"
                            name="artistEmail"
                            value={formData.artistEmail}
                            onChange={handleChange}
                            required
                            placeholder="email@artista.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Telefone / Celular</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="(XX) XXXXX-XXXX"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="city">Cidade de Atuação</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="Ex: Rio de Janeiro"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="biography">Biografia (Opcional)</label>
                        <textarea
                            id="biography"
                            name="biography"
                            value={formData.biography}
                            onChange={handleChange}
                            placeholder="Conte um pouco sobre sua história..."
                        />
                    </div>

                    <div className={styles.footer}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.btnCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnSubmit}
                        >
                            Tornar-se Artista
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BecomeArtistModal;