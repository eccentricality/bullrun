import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USERS } from '../utils/queries';
import Header from '../components/Header';
import Ticker from '../components/Ticker';
import SideNav from '../components/SideNav';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const Home = () => {

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }
  return (
    <main>
      <Banner/>
    </main>
  );
};

export default Home;
