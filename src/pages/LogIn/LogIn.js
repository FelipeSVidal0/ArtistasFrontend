import styles from './LogIn.module.css';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function LogIn() {
    const [showPassword, setShowPassword] = useState(false);

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
            const response = await api.post('/auth/login', formData);

            if (response.ok) {
                const user = await response.json();
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
                    <p>Descubra o poder da arte com o<span> +ARTE</span></p>
                    <p>Compartilhe suas criações, conecte-se com outros artistas e inspire o mundo com o seu talento.</p>
                    <p>Cada obra é uma nova oportunidade de mostrar quem você é!</p>
                </div>
            </section>

            <section className={styles['container-right']}>
                <nav>
                    <p>Ainda não tem conta?</p>
                    <button
                        className={styles.signUp}
                        onClick={() => navigate("/signup")}
                    >
                        Cadastre-se
                    </button>
                </nav>

                <form className={styles.login} onSubmit={handleLogin} autoComplete="off">
                    <div className={styles.loginLbl}>
                        <h1>Entrar</h1>
                        <p>Insira seus dados para avançar</p>
                    </div>

                    {error && (
                        <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '1rem', background: '#ffebee', padding: '10px', borderRadius: '5px' }}>
                            {error}
                        </p>
                    )}

                    <div className={styles.inputs}>
                        <p>E-mail</p>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite o seu e-mail"
                            type="email"
                            required
                        />

                        <p>Senha</p>
                        <div className={styles['password-container']}>
                            <input
                                className={styles['password-input']}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite a sua senha"
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

                    <div className={styles['loginBtn-container']}>
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