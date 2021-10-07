import React, { useState, useRef, useEffect } from 'react';
import './stockform.css'
import auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_ASSET } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_PORTFOLIO } from '../../utils/queries';


function Portfolio( { user } ) {


    //pull portfolio data
    const { loading, data, test } = useQuery(QUERY_PORTFOLIO, {
        variables: { userId:  user },
      });
      console.log("xxxxxxxx", data)
    console.log("--------", user)

    return (
        <>

        </>
    );
}

export default Portfolio;