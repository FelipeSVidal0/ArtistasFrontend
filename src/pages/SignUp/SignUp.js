import './SignUp.css'
import React, {useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi'

function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2)
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

                <label class="login">Entrar</label>
            </nav>

            <form class="signup"> 
                <label class="signupLbl">
                    <h1>Cadastre-se</h1>
                    <p>Insira seus dados para avançar</p>
                </label>

                <div class="inputs">
                    <p>Usuário</p>
                    <input required class="email" placeholder="Digite o seu Nome de Usuário " type="text"></input>

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
                        
                        <p>Repita sua Senha</p>
                        <div class="password-container">
                            <input
                                class="password-input"
                                type={showPassword2 ? "password" : "text"}
                                placeholder="Digite a sua Senha Novamente "
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                class="passwordBtn"
                            >
                                {showPassword2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
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