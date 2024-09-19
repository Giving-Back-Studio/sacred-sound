// import React from 'react';
// import styled from 'styled-components';
// import MandalaBG from '../assets/MandalaBG.png';
// import LoginButton from '../components/LoginButton';
// import LogoImage from '../assets/VerticalLogo.png';
// import { GlobalStyle } from '../components/GlobalStyle';


// //Disabled Jan2024
// export default function ArtistCreatePage() {
//     return (
//         <>
//         <GlobalStyle/>
//         <BackgroundImageDiv backgroundImage={MandalaBG}></BackgroundImageDiv>
//             <LogoImageStyled src={LogoImage} alt="Sacred Sound" />
//             <CenteredDiv>
//             <LoginButton />
//             <ErrorMessageStyled>
//                 <h1 style={{fontWeight:'bold'}}>Thank you for coming to play!</h1>
//                 <h3>Please open on desktop or tablet to access the Cloud Studio.</h3>
//             </ErrorMessageStyled>
//             </CenteredDiv>
//         </>
//     );
// }

// const BackgroundImageDiv = styled.div`
//     background-image: url(${props => props.backgroundImage});
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     height: 100vh;
//     background-size: cover;
//     background-position: center;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     height: 100vh;
//     opacity: 11%;
// `;

// const CenteredDiv = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
// `;

// const LogoImageStyled = styled.img`
//     position: absolute;
//     left: 50%;
//     top: 10%;
//     transform: translateX(-50%);

//     @media (max-height: 800px) {
//         height: 250px;
//     }
//     @media (max-height: 670px) {
//         height: 120px; // or any other desired height
//     }
// `;


// const ErrorMessageStyled = styled.div`
//     display: none;
//     color: #434289;
//     white-space: nowrap;
//     @media (max-width: 768px) {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//     }
// `;