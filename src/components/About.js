import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="content-box">
        <h3 className="heading"> INSTRUCTIONS</h3>
        <h5 className="steps">
          Step 1: If you already have an account, click <strong>Login</strong> to start.<br />
          Step 2: If you are a new user, click <strong>Signup</strong> to continue.
        </h5>
      </div>
    </div>
  );
}

export default About;
