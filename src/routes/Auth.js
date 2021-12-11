import React, { useState } from 'react';
import {
  authService,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider
} from 'fbase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    try {
      const data = await signInWithPopup(authService, provider);
      console.log(data);
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.log(error.message);
      }
    }
  }
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm newAccount={newAccount} toggleAccount={toggleAccount} />
      <div className='authBtns'>
        <button name="google" onClick={onSocialClick} className='authBtn'>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name="github" onClick={onSocialClick} className='authBtn'>
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div >
  );
}
export default Auth;
