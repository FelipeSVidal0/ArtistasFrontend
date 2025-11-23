import { useEffect, useState } from "react";

function TesteObra() {

    const [artists, setArtists] = useState([]);
    const [artworks, setArtworks] = useState([]);

    const [formData, setFormData] = useState({
        artistId: "",
        title: "",
        description: "",
        type: "art"
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchArtists();
        fetchArtworks();
    }, []);

    // Buscar artistas
    const fetchArtists = async () => {
        try {
            const res = await fetch("http://localhost:8080/artist");
            const data = await res.json();

            setArtists(data);
        } catch (err) {
            console.error("Erro ao buscar artistas:", err);
        }
    };

    const fetchArtworks = async () => {
        try {
            const res = await fetch("http://localhost:8080/artwork");
            const data = await res.json();

            setArtworks(data.filter(a => a !== null));
        } catch (err) {
            console.error("Erro ao buscar artworks:", err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
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

        const data = new FormData();
        data.append("artistId", formData.artistId); 
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("type", formData.type);
        data.append("file", file);

        console.log("ENVIANDO:");
        for (let pair of data.entries()) {
            console.log(pair[0] + ":", pair[1]);
        }

        try {
            const res = await fetch("http://localhost:8080/artwork", {
                method: "POST",
                body: data
            });

            if (res.ok) {
                alert("Obra enviada com sucesso!");
                fetchArtworks(); // atualiza lista
            } else {
                alert("Erro ao enviar obra");
            }
        } catch (err) {
            console.error("Erro no envio:", err);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px" }}>
            <h2>Adicionar Obra</h2>

            <form onSubmit={handleSubmit}>

                {/* SELECT DE ARTISTA — CORRIGIDO PARA USAR artist_id */}
                <label>Artista:</label>
                <select
                    name="artistId"
                    value={formData.artistId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>

                    {artists.map(a => (
                        <option
                            key={a.artist_id}
                            value={a.artist_id}  // <-- VALUE CORRETO
                        >
                            {a.artistName || a.user?.nome}
                        </option>
                    ))}
                </select>

                <br /><br />

                <label>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <label>Descrição:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <label>Tipo:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="art">Arte</option>
                    <option value="music">Música</option>
                    <option value="handcraft">Artesanato</option>
                </select>

                <br /><br />

                <label>Arquivo (imagem / vídeo):</label>
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    required
                />

                {preview && (
                    <div style={{ marginTop: 10 }}>
                        {file.type.startsWith("image") ? (
                            <img src={preview} width="200" />
                        ) : (
                            <video src={preview} width="200" controls />
                        )}
                    </div>
                )}

                <br />

                <button type="submit">Enviar Obra</button>
            </form>

            <hr />

            <h2>Lista de Obras</h2>

            {artworks.map(a => (
                <div key={a.artWorkId} style={{ border: "1px solid #ccc", marginBottom: 15, padding: 10 }}>
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>

                    <p><b>Artista:</b> {a.artist?.user?.nome}</p>

                    {a.contentType === "image" ? (
                        <img src={`http://localhost:8080${a.contentUrl}`} width="200" />
                    ) : (
                        <video src={`http://localhost:8080${a.contentUrl}`} width="200" controls />
                    )}
                </div>
            ))}
        </div>
    );
}

export default TesteObra;
