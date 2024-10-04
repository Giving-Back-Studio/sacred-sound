// import React, { useState } from 'react';
// import styled, { createGlobalStyle } from 'styled-components';
// import { GlobalStyle } from '../components/GlobalStyle';
// import MandalaBG from '../assets/MandalaAlpha.png';

// function AccountNamePopup() {
//   const [showPopup, setShowPopup] = useState(false);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <button onClick={togglePopup}>Open Popup</button>
//       {showPopup && (
//         <PopupContainer>
//           <PopupBackground />
//           <div style={{backgroundColor:'white', zIndex:'1', borderRadius:'33px'}}>
//             <PopupWrapper backgroundImage={MandalaBG}>
//               <h2 style={{color: "black"}}>Welcome, friend, to Sacred Sound.</h2>
//               <h2 style={{color: "black", marginTop:"25px"}}>Enter the name for your public profile, and get <br/>started uploading your beest quality sacred sound.</h2>
//               <p style={{color: "#434289", lineHeight: "0", marginTop:"25px"}}>Choose your account name.</p>
//               <input type="text" style={{borderRadius:"33px", padding:"15px", width:"90%"}} />
//               <CenteredButton onClick={togglePopup}><h1 style={{color: "#F5F5F5", lineHeight: "0"}}>Get Started</h1></CenteredButton>
//             </PopupWrapper>
//           </div>
//         </PopupContainer>
//       )}
//     </>
//   );
// }

// export default AccountNamePopup;

// const PopupContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const PopupBackground = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 0;
// `;

// const PopupWrapper = styled.div`
//     background-image: url(${props => props.backgroundImage});
//   position: relative;
//   z-index: 3;
//   border-radius: 33px;
//   padding: 20px;
//   background-color: rgba(163, 196, 163, 0.22);

// `;

// const CenteredButton = styled.button`
//     border: none;
//     color: #F5F5F5;
//     background-color: #434289;
//     border-radius: 33px;
//     align-self: center;
//     cursor: pointer;
//     width: 100%;
//     margin-top: 20px;
//     padding: 11px;
//     `;

// //background-color: #A3C4A338;