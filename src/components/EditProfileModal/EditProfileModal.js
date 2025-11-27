import { IonIcon } from '@ionic/react';
import {
    closeCircleOutline,
    cloudUploadOutline,
    eyeOutline,
    eyeOffOutline,
    person
} from 'ionicons/icons';
import { useState } from "react";
import styles from "./EditProfileModal.module.css";
import api from "../../services/api";

const EditProfileModal = ({ loggedUserData, artistData, onClose, refreshIsArtist, refreshUser }) => {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState(() => {
        if (artistData) {
            return {
                nome: artistData.user.nome,
                email: artistData.user.email,
                password: "",
                biography: artistData.biography || "",
                artistEmail: artistData.artistEmail || "",
                phone: artistData.phone || "",
                city: artistData.city || "",
            };
        }
        return {
            nome: loggedUserData?.nome || "",
            email: loggedUserData?.email || "",
            password: ""
        };
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [newProfileFile, setNewProfileFile] = useState(null);

    const initialPhotoUrl = loggedUserData?.profilePhotoUrl
        ? `${api.baseUrl}${loggedUserData.profilePhotoUrl}`
        : '';

    const [previewUrl, setPreviewUrl] = useState(initialPhotoUrl);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProfileFile(file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalPhotoUrl = loggedUserData.profilePhotoUrl;

        if (newProfileFile) {
            try {
                const photoData = new FormData();
                photoData.append("photo", newProfileFile);

                const uploadRes = await api.postFormData(
                    `/user/${loggedUserData.id}/profile-photo`,
                    photoData
                );

                const uploadJson = await uploadRes.json();
                finalPhotoUrl = uploadJson.profilePhotoUrl;
            } catch (err) {
                console.error(err);
                alert("Não foi possível enviar a foto.");
                return;
            }
        }

        const userUpdatePayload = {
            id: loggedUserData.id,
            nome: formData.nome,
            email: formData.email,
            profilePhotoUrl: finalPhotoUrl,
        };

        if (formData.password.trim() !== "") {
            userUpdatePayload.password = formData.password;
        }

        try {
            await api.put(`/user/${loggedUserData.id}`, userUpdatePayload);
        } catch (err) {
            console.error(err);
            alert("Erro ao atualizar usuário.");
            return;
        }

        if (artistData) {
            const artistPayload = {
                artistEmail: formData.artistEmail,
                phone: formData.phone,
                city: formData.city,
                biography: formData.biography
            };

            try {
                await api.put(`/artist/${artistData.artistId}`, artistPayload);
            } catch (err) {
                console.error(err);
                alert("Erro ao atualizar artista.");
                return;
            }
        }

        alert("Perfil atualizado com sucesso!");

        if (refreshIsArtist) refreshIsArtist();
        if (refreshUser) refreshUser();

        onClose();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.editModal}>
                <div className={styles.modalHeader}>
                    <h3>Editar Perfil</h3>
                    <IonIcon
                        icon={closeCircleOutline}
                        onClick={onClose}
                        className={styles.closeIcon}
                    />
                </div>

                <form onSubmit={handleSubmit}>

                    <div className={styles.photoUploadGroup}>
                        <div className={styles.photoPreview}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Foto de perfil" />
                            ) : (
                                <IonIcon icon={person} style={{ color: "#4C096B", fontSize: "65px" }} />
                            )}
                        </div>

                        <label htmlFor="profile-upload" className={styles.fileUploadLabel}>
                            <IonIcon icon={cloudUploadOutline} />
                            {newProfileFile ? "Alterar Foto" : "Selecionar Nova Foto"}
                        </label>

                        <input
                            type="file"
                            id="profile-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.hiddenFileInput}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Senha</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Deixe vazio para manter"
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                            >
                                <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                            </button>
                        </div>
                    </div>

                    {artistData && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Biografia</label>
                                <textarea
                                    name="biography"
                                    value={formData.biography}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>E-mail Profissional</label>
                                <input
                                    type="email"
                                    name="artistEmail"
                                    value={formData.artistEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Telefone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Cidade</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.modalActions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.saveBtn}>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;