import React from 'react';
import './stockform.css'
import Signin from '../SignIn/Signin' 
import auth from '../../utils/auth';
import Stockform from './StockForm'



function Portfolio() {

    if (auth.loggedIn()) { 
        return <Stockform />
    } else {
       return <Signin />
}
}

export default Portfolio;