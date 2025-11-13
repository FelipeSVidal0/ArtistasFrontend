import './LogIn.css'
import React, {useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';

function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
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

                <label class="signUp">Cadastre-se</label>
            </nav>

            <form class="login"> 
                <label class="loginLbl">
                    <h1>Entrar</h1>
                    <p>Insira seus dados para avançar</p>
                </label>

                <div class="inputs">
                    <p>E-mail</p>
                    <input required class="email" placeholder="Digite o seu E-mail " type="text"></input>

                        <p>Senha</p>
                        <div class="password-container">
                            <input
                                class="password-input"
                                type={showPassword ? "password" : "text"}
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