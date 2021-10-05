import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';



function Login() {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
            
        try {
            const { data } = await login({
                variables: formState,
            });
            
            Auth.login(data.login.token);
        } catch (event) {
            console.error(event);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <>
            <div className="row ">
                <div className="col s12" id="login-form">

                    <div className="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 test text">

                        <div className="row">
                            <div className="center-align">
                                <h4 className="text">Welcome back!</h4>
                            </div>
                        </div>
                        <form onSubmit={handleFormSubmit}>

                            <div className="row ">
                                <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                    <input placeholder="Email"
                                        name="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={handleChange}></input>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                    <input placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={formState.password}
                                        onChange={handleChange}></input>
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
                                    <button className="waves-effect waves-light btn" type="submit" name="action" to="/portfolio">Login!</button>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>
            </div>

        </>
    );
}

export default Login;