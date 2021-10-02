import React, { useState } from 'react';
import Render from './Render'


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
            <div className="center-align margin-bottom">
                <button
                    className={`waves-effect ${loginColor ? "green accent-3" : "red accent-2"} btn center-align margin-right margin-top`}
                    onClick={myLogin}>login</button>
                <button
                    className={`waves-effect ${signupColor ? "green accent-3" : "red accent-2"} btn center-align margin-right`}
                    onClick={mySignUp}>signup</button>
            </div>
            <Render loginColor={loginColor} />
        </>
    );
}

export default Button;