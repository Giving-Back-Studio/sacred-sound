import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
      !isAuthenticated && (
        <SignupButton
          onClick={() =>
            loginWithRedirect({
              redirectUri: process.env.REACT_APP_REDIRECTURL, //Change this URL for Staging : "https://staging.sacredsound.pages.dev/studio", Change this Uri for prod: "https://sacredsound.app/studio" or to this uri for local testing : "http://localhost:3000/studio"
            })
          }
        >
          Become a Resident Artist
        </SignupButton>
      )
    );
}

export default LoginButton

const SignupButton = styled.button`
  border: none;
  color: #F5F5F5;
  background-color: #434289;
  border-radius: 33px;
  cursor: pointer;
  display: flex; // Use flex to center content
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  height: 100%;
  @media (max-width: 768px) {
    display: none; // Hide button on small screens for the /create page
  }
`;

