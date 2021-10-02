import React from 'react';
import { Link } from 'react-router-dom';


function Signup() {

    return (
        <>
            <div className="row ">

<form className="col s12" id="signup-form">

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

  <div className="row ">
    <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="First Name" id="first_name" type="text" className="validate"></input>
      <label for="first_name"></label>
    </div>
</div>

    <div className="row">
    <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Last Name" id="last_name" type="text" className="validate"></input>
      <label for="last_name"></label>
    </div>
</div>

  <div className="row">
    <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Password" id="password" type="password" className="validate"></input>
      <label for="password"></label>
    </div>
  </div>

  <div className="row">
    <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Email" id="email" type="email" className="validate"></input>
      <label for="email"></label>
    </div>
  </div>

  
  <div className="row">
    <div className="center-align">
        <Link className="waves-effect waves-light btn" type="submit" name="action" to='/portfolio'>Create account</Link>
    </div>
  </div>

</div>

</form>
</div>

        </>
    );
}

export default Signup;