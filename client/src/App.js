import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import Trends from './components/Trends';
import Signin from './components/SignIn/Signin'
import StockForm from './components/StockForm/StockForm';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';

import './materialize.css';
import './index.css';
import M from "materialize-css";

// Initialize Materialize Sidenav
let elem = "";
let options = "";

  document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, options);
    });

  var instance = M.Sidenav.getInstance(elem);

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// document.cookie = "SameSite=Lax";

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <TopNav />
        <SideNav />
        <div className="flex-column justify-space-between min-100-vh">
          <Header />
          <div id="wrapper" className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route exact path="/blog">
              <Blog />
            </Route>
            <Route exact path="/users/:id">
              <Profile />
            </Route>
            <Route exact path="/portfolio">
              <StockForm />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
