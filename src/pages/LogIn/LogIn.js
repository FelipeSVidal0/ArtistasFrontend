import './LogIn.css'
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('LoggedUser', JSON.stringify(user));
                localStorage.setItem('LoggedUser', JSON.stringify(user));
                navigate('/home');
            } else {
                setError('Email ou senha incorretos');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
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
                    <p>Ainda não tem conta?</p>

                    <button class="signUp" onClick={() => navigate("signup")}>Cadastre-se</button>
                </nav>

                <form class="login" onSubmit={handleLogin} autoComplete="off">
                    <label class="loginLbl">
                        <h1>Entrar</h1>
                        <p>Insira seus dados para avançar</p>
                    </label>

                    <div class="inputs">
                        <p>E-mail</p>
                        <input
                            class="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite o seu e-mail"
                            type="text"
                            required
                        />

                        <p>Senha</p>
                        <div class="password-container">
                            <input
                                class="password-input"
                                type={showPassword ? "password" : "text"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite a sua senha"
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
                    <div class="loginBtn-container">
                        <button type="submit">
                            Entrar
                        </button>
                    </div>
                </form>
            </section>

        </div>
    );

}

export default LogIn;