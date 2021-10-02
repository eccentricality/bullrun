import React, { useState } from 'react';
import Render from './Render'
import './styles/signup.css'

function Button() {

    const [login, setLogin] = useState('login');
    const [signup, setSignup] = useState('signup');
    const [loginColor, setActive] = useState(true);
    const [signupColor, setInActive] = useState(false);

    const myLogin = () => {
        setActive(true)
        setInActive(false)
    }

    const mySignUp = () => {
        setActive(false)
        setInActive(true)
    }

    return (
        <>
            <div class="center-align margin-bottom margin-top">
                <a
                    className={`waves-effect ${loginColor ? "green accent-3" : "red accent-2"} btn center-align margin-right`}
                    href="#a" onClick={myLogin}>login</a>
                <a
                    className={`waves-effect ${signupColor ? "green accent-3" : "red accent-2"} btn center-align margin-right`}
                    href="#a" onClick={mySignUp}>signup</a>
            </div>
            <Render  loginColor={loginColor}/>
        </>
    );
}

export default Button;