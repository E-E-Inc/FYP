import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
   <div>
    hi, this is the login page

    <Link to="/CapturePicturePage">Capture Picture</Link>
     <Link to="/Dashboard">Calorie Dashboard</Link>
   </div>
  );
}
export default LoginPage;