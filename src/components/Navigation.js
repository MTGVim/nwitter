import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ displayName }) => {
  console.log(displayName);
  return <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">
        <>{displayName !== null ?
          (`${displayName}'s Profile`
          ) : ("Profile"
          )
        }</>
        </Link></li>
    </ul>
  </nav>;
}
export default Navigation;