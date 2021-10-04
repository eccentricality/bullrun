import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';



function Login() {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(ADD_USER);

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
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
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
                                <h4 classNameName="text">Welcome back!</h4>
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
                                    <Link className="waves-effect waves-light btn" type="submit" name="action" to="/profile">Login!</Link>
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