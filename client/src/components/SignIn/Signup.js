import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';


function Signup() {

  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: formState,
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <>
      <div className="row ">

        <div className="col s12" id="signup-form" >

          <div className="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 backgroundWhite test text" id="marginBottomSmall">

            <div className="row bottom-margin">
              <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                <h4 className="center-align text">Signup for Bullrun!</h4>
              </div>
            </div>

            <div className="row">
              <div className="input-field col l8 offset-l2 m10 offset-m1 s10 offset-s1">
                <div className="center-align marginTopNeg text">Join Bullrun to start your journey into the world of day trading!</div>
              </div>
            </div>
            {/*
            <div className="row ">
              <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                <input placeholder="First Name" id="first_name" type="text" className="validate" onChange={handleChange} value={formState.firstname}></input>
                <label for="first_name"></label>
              </div>
            </div>
    */}
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/portfolio">to the portfolio page.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                    <input placeholder="Full Name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}></input>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                    <input placeholder="Username"
                      name="username"
                      type="text"
                      value={formState.username}
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
                  <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                    <input placeholder="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}></input>
                  </div>
                </div>


                <div className="row">
                  <div className="center-align">
                    <button className="waves-effect waves-light btn" type="submit" name="action" >Create account</button>
                  </div>
                </div>
              </form>
            )}

            {error && (
              <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                {error.message}
              </div>
            )}


          </div>

        </div>
      </div>

    </>
  );
}

export default Signup;