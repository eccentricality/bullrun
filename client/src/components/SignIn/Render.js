import React, { useState } from 'react';
import Login from './Login'
import Signup from './Signup';
import './styles/signup.css'


    function Render(props) {
        
        if (props.loginColor) {
          return <Login />;
        }
        return <Signup />;

}

export default Render;