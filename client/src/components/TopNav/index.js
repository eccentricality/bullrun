import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import M from "materialize-css";

const TopNav = () => {

    let elem = "";
    let options = "";

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, options);
      });

    var instance = M.Sidenav.getInstance(elem);

    return (
        <a href="#" data-target="nav-mobile" class="top-nav sidenav-trigger full hide-on-large-only">
            <i class="material-icons">menu</i>
        </a>
    );
};

export default TopNav;