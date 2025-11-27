import React, { useState, useRef } from "react";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import styles from "./PostArtworkModal.module.css";
import api from "../../services/api";

export default function PostArtworkModal({ onClose, artistData, refreshArtworks }) {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        artistId: artistData.artistId,
        title: "",
        description: "",
        type: null
    });

    const handleTypeChange = (event) => {
        setFormData(prev => ({ ...prev, type: event.target.id }));
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Escolha uma imagem ou vídeo.");
            return;
        }

        if (!formData.title || !formData.description || !formData.type) {
            alert("Preencha todos os campos e selecione o tipo da obra.");
            return;
        }

        const data = new FormData();
        data.append("artistId", formData.artistId);
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("type", formData.type);
        data.append("file", file);

        try {
            const res = await api.postFormData("/artwork", data);

            if (res.ok) {
                alert("Obra enviada com sucesso!");
                refreshArtworks()
                onClose();
            } else {
                alert("Erro ao enviar obra");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.modalBg} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <form onSubmit={handleSubmit} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar Modal">×</button>

                <div className={styles.topAddObra}>
                    <div className={styles.addObraLogo}>
                        <img alt="logo da plataforma" src="/logo-grande.png" />
                    </div>

                    <div className={styles.addObraText}>
                        <h1 id="modal-title">Adicionar Obra</h1>
                        <p>Preencha os detalhes da sua criação artística.</p>
                    </div>
                </div>

                <div className={styles.tipoDeObra}>
                    <h2 className={styles.h2}>Selecione o Tipo da Obra</h2>

                    <div className={styles.radioBtns}>
                        <label htmlFor="MUSICA" className={styles.radioBtn}>
                            <input type="radio" id="MUSICA" name="grupo-radio" checked={formData.type === "MUSICA"} onChange={handleTypeChange} />
                            <div className={styles.radioText}>
                                <h3>Música</h3>
                                <p>Transforme sons em emoção!</p>
                            </div>
                        </label>

                        <label htmlFor="AUDIOVISUAL" className={styles.radioBtn}>
                            <input type="radio" id="AUDIOVISUAL" name="grupo-radio" checked={formData.type === "AUDIOVISUAL"} onChange={handleTypeChange} />
                            <div className={styles.radioText}>
                                <h3>Audiovisual</h3>
                                <p>Histórias que ganham vida na tela!</p>
                            </div>
                        </label>

                        <label htmlFor="ARTESANATO" className={styles.radioBtn}>
                            <input type="radio" id="ARTESANATO" name="grupo-radio" checked={formData.type === "ARTESANATO"} onChange={handleTypeChange} />
                            <div className={styles.radioText}>
                                <h3>Artesanato</h3>
                                <p>Crie com as mãos, inspire com o coração!</p>
                            </div>
                        </label>

                        <label htmlFor="DESENHOS_E_PINTURAS" className={styles.radioBtn}>
                            <input type="radio" id="DESENHOS_E_PINTURAS" name="grupo-radio" checked={formData.type === "DESENHOS_E_PINTURAS"} onChange={handleTypeChange} />
                            <div className={styles.radioText}>
                                <h3>Desenhos e Pinturas</h3>
                                <p>Quando o traço vira expressão!</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div className={styles.escolhaArquivo}>
                    <h2 className={styles.h2}>Selecione o Arquivo</h2>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                    />

                    <div className={styles.arquivoContainer} onClick={handleFileClick}>
                        {file ? (
                            <div className={styles.selectedFileText}>
                                <h3>Arquivo Selecionado:</h3>
                                <p>{file.name}</p>
                                <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>(Clique para alterar)</p>
                            </div>
                        ) : (
                            <>
                                <img alt="Ícone de upload" src="/upload.png" />
                                <h3>Clique para selecionar as suas obras</h3>
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.descricaoObra}>
                    <h2 className={styles.h2}>Título da Obra</h2>
                    <input
                        type="text"
                        className={styles.inputTitle}
                        name="title"
                        placeholder="Adicione o nome da obra"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <h2 className={styles.h2}>Descrição</h2>
                    <textarea
                        className={styles.descricaoContainer}
                        rows="4"
                        name="description"
                        placeholder="Adicione uma descrição da sua obra, incluindo detalhes, materiais ou inspiração..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <button className={styles.publicarBtn} type="submit">
                        <IonIcon className={styles.plus} icon={addOutline} />
                        Publicar Obra
                    </button>
                </div>
            </form>
        </div>
    );
}