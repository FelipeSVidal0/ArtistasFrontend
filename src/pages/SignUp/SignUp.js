import './SignUp.module.css'
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'

function SignUp() {
    const [showPassword, setShowPassword] = useState(true);


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
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                body: form
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                setFormData({ nome: '', email: '', password: '' });
                setPhoto(null); 
                setPhotoKey(Date.now());
            } else {
                alert("Erro ao cadastrar");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div class="body">

            <section class="container-left">
                <h1>+ARTE</h1>

                <img class="logo" src={`${process.env.PUBLIC_URL}/logo.png`}></img>

                <div class="texto-pri">

                    <p>Crie.</p>

                    <p>Compartilhe.</p>

                    <p>Inspire!</p>

                </div>

                <div class="texto-sec">

                    <p>Descubra o poder da arte com o<span> +ARTE</span></p>

                    <p>Compartilhe suas criações, conecte-se com outros artistas e inspire o mundo com  o seu talento.</p>

                    <p>Cada obra é uma nova oportunidade de mostrar quem você é!</p>
                </div>

            </section>

            <section class="container-right">
                <nav>
                    <p>Já tem conta?</p>

                    <button class="login">Entrar</button>
                </nav>

                <form class="signup" onSubmit={handleRegister} autoComplete="off">
                    <label class="signupLbl">
                        <h1>Cadastre-se</h1>
                        <p>Insira seus dados para avançar</p>
                    </label>

                    <input
                        key={photoKey}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />


                    <div class="inputs">
                        <p>Nome</p>
                        <input
                            class="email"
                            placeholder="Digite o seu nome"
                            type="text"
                            name="nome"
                            onChange={handleChange}
                            value={formData.nome}
                            required
                        />

                        <p>E-mail</p>
                        <input
                            class="email"
                            placeholder="Digite o seu e-mail"
                            type="text"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />


                        <p>Senha</p>
                        <div class="password-container">
                            <input
                                class="password-input"
                                type={showPassword ? "password" : "text"}
                                placeholder="Digite a sua senha"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                class="passwordBtn"

                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div class="signupBtn-container">
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