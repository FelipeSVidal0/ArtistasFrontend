import styles from './SignUp.module.css';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: ''
    });

    const [photo, setPhoto] = useState(null);
    const [photoKey, setPhotoKey] = useState(Date.now())


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("nome", formData.nome);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("photo", photo);

        try {
            const response = await api.postFormData("/auth/register", form);

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setFormData({ nome: '', email: '', password: '' });
                setPhoto(null);
                setPhotoKey(Date.now());
                navigate('/');
            } else {
                alert("Erro ao cadastrar");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.body}>

            <section className={styles['container-left']}>
                <h1>+ARTE</h1>

                <img
                    className={styles.logo}
                    src={`${process.env.PUBLIC_URL}/logo.png`}
                    alt="Logo +Arte"
                />

                <div className={styles['texto-pri']}>
                    <p>Crie.</p>
                    <p>Compartilhe.</p>
                    <p>Inspire!</p>
                </div>

                <div className={styles['texto-sec']}>
                    <div>
                        <p>Descubra o poder da arte com o<span> +ARTE</span></p>
                        <p>Compartilhe suas criações, conecte-se com outros artistas e inspire o mundo com o seu talento.</p>
                    </div>
                    <p>Cada obra é uma nova oportunidade de mostrar quem você é!</p>
                </div>

            </section>

            <section className={styles['container-right']}>
                <nav>
                    <p>Já tem conta?</p>

                    <button
                        className={styles.login}
                        onClick={() => navigate('/')} 
                    >
                        Entrar
                    </button>
                </nav>

                <form className={styles.signup} onSubmit={handleRegister} autoComplete="off">
                    <div className={styles.signupLbl}>
                        <h1>Cadastre-se</h1>
                        <p>Insira seus dados para avançar</p>
                    </div>


                    <input
                        key={photoKey}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        style={{ margin: '1rem 0', padding: '10px', border: '1px dashed #ccc', borderRadius: '8px' }}
                    />

                    <div className={styles.inputs}>
                        <p>Nome</p>
                        <input
                            type="text"
                            placeholder="Digite o seu nome"
                            name="nome"
                            onChange={handleChange}
                            value={formData.nome}
                            required
                        />

                        <p>E-mail</p>
                        <input
                            type="email"
                            placeholder="Digite o seu e-mail"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />

                        <p>Senha</p>
                        <div className={styles['password-container']}>
                            <input
                                className={styles['password-input']}
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite a sua senha"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.passwordBtn}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className={styles['signupBtn-container']}>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </section>

        </div>
    );
}

export default SignUp;