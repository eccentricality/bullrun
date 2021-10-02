import React from 'react';
import './styles/signup.css'

function Login() {
    // The return statement contains something called "JSX"
    // JSX is a syntax extension to Javascript that allows us to write HTML inside Javascript
    // Expressions in JSX should be placed in curly braces {}
    return (
        <>
            <div class="row container">
                <form class="col s12" id="login-form">

                    <div class="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 backgroundWhite">

                        <div class="row">
                            <div class="center-align">
                                <h4>Welcome back!</h4>
                            </div>
                        </div>

                        <div class="row ">
                            <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                <input placeholder="Email" id="email-login" type="text" class="validate"></input>
                                <label for="usernameEmail"></label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                <input placeholder="Password" id="password-login" type="password" class="validate"></input>
                                <label for="password"></label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="center-align">
                                <a href="#a">Forget your username?</a>
                            </div>
                        </div>

                        <div class="row">
                            <div class="center-align">
                                <a href="#a">Forget your password?</a>
                            </div>
                        </div>

                        <div class="row">
                            <div class="center-align">
                                <button class="waves-effect waves-light btn" type="submit" name="action">Login!</button>
                            </div>
                        </div>

                    </div>

                </form>
            </div>

        </>
    );
}

export default Login;