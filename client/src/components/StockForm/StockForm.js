import React from 'react';
import { Link } from 'react-router-dom';



function StockForm() {
    // The return statement contains something called "JSX"
    // JSX is a syntax extension to Javascript that allows us to write HTML inside Javascript
    // Expressions in JSX should be placed in curly braces {}
    return (
        <>
            <div className="row ">
                <form className="col s12" id="login-form">

                    <div className="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 test text">

                        <div className="row">
                            <div className="center-align">
                                <h4 classNameName="text">Welcome back!</h4>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                <input placeholder="Email" id="email-login" type="text" className="validate"></input>
                                <label for="usernameEmail"></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                <input placeholder="Password" id="password-login" type="password" className="validate"></input>
                                <label for="password"></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                                <a href="#a">Forget your username?</a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                                <a href="#a">Forget your password?</a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                            <Link className="waves-effect waves-light btn" type="submit" name="action" to="/profile">Login!</Link>
                            </div>
                        </div>

                    </div>

                </form>
            </div>

        </>
    );
}

export default StockForm;