import React from 'react';
import './styles/signup.css'

function Signup() {

    return (
        <>
            <div class="row container">

<form class="col s12" id="signup-form">

    <div class="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 backgroundWhite" id="marginBottomSmall">

    <div class="row bottom-margin">
        <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
          <h4 class="center-align ">Signup for Bullrun!</h4>
        </div>
    </div>

    <div class="row">
        <div class="input-field col l8 offset-l2 m10 offset-m1 s10 offset-s1">
          <div class="center-align marginTopNeg">Join Bullrun to start your journey into the world of day trading!</div>
        </div>
    </div>

  <div class="row ">
    <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="First Name" id="first_name" type="text" class="validate"></input>
      <label for="first_name"></label>
    </div>
</div>

    <div class="row">
    <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Last Name" id="last_name" type="text" class="validate"></input>
      <label for="last_name"></label>
    </div>
</div>

  <div class="row">
    <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Password" id="password" type="password" class="validate"></input>
      <label for="password"></label>
    </div>
  </div>

  <div class="row">
    <div class="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
      <input placeholder="Email" id="email" type="email" class="validate"></input>
      <label for="email"></label>
    </div>
  </div>

  
  <div class="row">
    <div class="center-align">
        <button class="waves-effect waves-light btn" type="submit" name="action">Create account</button>
    </div>
  </div>

</div>

</form>
</div>

        </>
    );
}

export default Signup;