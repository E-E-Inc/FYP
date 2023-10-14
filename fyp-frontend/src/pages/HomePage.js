import * as React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Pages</h1>
      <Link to="/Login">Login </Link>
      <Link to="/SignUp">Sign Up</Link>
    </div>
  );
}

export default Home;