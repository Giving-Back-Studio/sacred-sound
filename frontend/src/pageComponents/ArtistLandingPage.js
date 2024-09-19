import React from 'react';
import logo from '../assets/HorozontalLogoWhiteFont.png';
import { useAuth0 } from '@auth0/auth0-react';
import ExplainerVideo from '../assets/SacredSoundExplainerVideo.mp4';
import styled from 'styled-components';
import userGroup from '../assets/userGroup.png';
import musicNote from '../assets/musicNote.png';
import heart from '../assets/heart.png'
import FAQsContainer from '../components/CloudStudioComponents/FAQsContainer';

const ArtistLandingPage = () => {
    const { loginWithRedirect } = useAuth0();;

    const contentStyle = {
        position: 'relative',
        zIndex: 2, // Ensure content sits on top of the tint
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'transparent'
    };

    const logoStyle = {
        width: '240px',
        height: '80px',
        margin: '40px'
    };

    const buttonStyle = {
    padding: '30px 60px',
    backgroundColor: '#434289',
    color: 'white',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px'
};

    const secondSectionStyle = {
        display: 'flex',
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid #D9D9D9',
        backgroundColor: 'rgb(248,248,248)',
        paddingLeft: '80px'
    };

    const leftTextStyle = {
        width: '50%', 
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingRight: '150px'
    };

    const rightVideoStyle = {
        width: '50%', 
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    };
    
    const thirdSectionStyle = {
        display: 'flex',
        height: 'auto', 
        backgroundColor: '#f8f8f8', 
        alignItems:'center',
        borderBottom: '1px solid #D9D9D9',
        paddingTop: '80px',
        paddingBottom: '80px'
    };

    const leftColumnStyle = {
        backgroundColor: '#A3C4A3',
        width: '45%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '80px',
        paddingLeft: '74px',
        paddingRight: '74px',
        paddingTop: '131px',
        paddingBottom: '131px'
    };

    const rightColumnStyle = {
        width: '55%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
    };

    const fourthSectionStyle = {
        flexDirection: 'column',
        paddingTop: '8vh',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #D9D9D9'
    };

    const ctaButtonStyle = {
        padding: '10px 20px',
        backgroundColor: '#434289',
        color: 'white',
        border: 'none',
        borderRadius: '0px',
        cursor: 'pointer',
        fontSize: '18px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        outline: 'none',
        minWidth: '30vw',
        marginTop: '80px',
    };

    return (
        <>
        {/* First section */}
        <SectionDiv>
            <TintedOverlay/>
            <div style={contentStyle}>
            <img src={logo} alt="Logo" style={logoStyle} />
            <div style={{color: 'white',width: '100%', backgroundColor:'transparent'}}>
                <h1 style={{ color: 'white',  fontSize:'48px', marginBottom:'5px', marginLeft:'80px'}}>
                Join the Collective
                </h1>
                <h2 style={{fontSize:'26px', color:'white', marginBottom:'66px', marginLeft:'80px'}}>
                    Connect intimately with listeners that go deep
                </h2>
                <div style={{display:'flex', backgroundColor:'transparent', marginLeft:'80px', marginBottom:'162px'}}>
                <button style={buttonStyle} onClick={() =>
                    loginWithRedirect({
                    redirectUri: process.env.REACT_APP_REDIRECTURL,
                    })
                }>
                    GET STARTED
                </button>
                </div>
            </div>
            </div>
        </SectionDiv>

        {/* Second section */}
        <div style={secondSectionStyle}>
            <div style={leftTextStyle}>
                <h2 style={{fontSize:'48px', marginBottom: '21px'}}>A platform designed for your journey as a sacred music artist.</h2>
                <p style={{fontSize:'18px', marginTop: '0px'}}>We pay artists directly and provide professional support to enhance the value of what you create.</p>
            </div>
            <div style={rightVideoStyle}>
                    <video 
                        src={ExplainerVideo} 
                        controls 
                        style={{ width: '90%', height: 'auto', objectFit: 'cover' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
        </div>

        {/* Third section */}
        <div style={thirdSectionStyle}>
            <div style={leftColumnStyle}>
            <h1 style={{fontSize:'48px', color:'white'}}>Welcome to Your <br/> <ItalicText>Cloud Studio</ItalicText> </h1>
            <p style={{color:'white', fontSize:'18px'}}>A platform for new cash flow steams, direct connection to listeners, and professional studio support from Sacred Sound Studios.</p>
            </div>
            <div style={rightColumnStyle}>
            <h2 style={{fontSize:'24px', marginBottom:'0px', fontWeight: '600'}}>Expand through more intimate connection.</h2>
            <p style={{fontSize:'18px', marginBottom:'6vh'}}>Invite your listeners along deeper into your creative process through video lessons, events, behind the scenes, and more!</p>
            <h2 style={{fontSize:'24px', marginBottom:'0px', fontWeight: '600'}}>Earn professional studio support through your music.</h2>
            <p style={{fontSize:'18px', marginBottom:'6vh'}}>Gain tokens, ‘thanks coins,’ directly from listeners as they gain inspiration, which you can redeem for studio services.</p>
            <h2 style={{fontSize:'24px', marginBottom:'0px', fontWeight: '600'}}>Create new revenue streams with your content.</h2>
            <p style={{fontSize:'18px'}}>Upload your magic into our sacred music library, and get paid for every minute of content that gets viewed.</p>
            </div>
        </div>
        
    {/* Fourth section */}
        <div style={fourthSectionStyle}>
            <h2 style={{color: '#434289', fontSize: '48px', marginLeft: '80px', marginBottom:'0px', marginTop: '0px'}}>Let’s Create Magic Together</h2>
            <p style={{fontSize:'18px', marginLeft: '80px', marginBottom:'93px'}}>Share sacred music and receive support from listeners you inspire.</p>
            <div style={{display:'flex', justifyContent: 'space-between', marginLeft: '80px', marginRight: '30px', marginBottom: '60px', backgroundColor:'transparent'}}>
                <div style={{display:'flex', flexDirection:'column', backgroundColor:'transparent', width: '28vw'}}>
                    <img src={userGroup} alt="userGroup" style={{width:'4vw'}}/>
                    <h2 style={{fontSize: '32px', marginBottom: '0vh'}}>Join the Artist Collective</h2>
                    <p style={{fontSize:'18px'}}>Be one of up to 100 artists selected to join the Sacred Sound Artist Collective.</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', backgroundColor:'transparent', width: '28vw'}}>
                    <img src={musicNote} alt="musicNote" style={{width:'4vw'}}/>
                    <h2 style={{fontSize: '32px', marginBottom: '0vh'}}>Publish Your Magic</h2>
                    <p style={{fontSize:'18px'}}>Reach the right audience for you and get paid for every minute of content that gets viewed.</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', backgroundColor:'transparent', width: '28vw'}}>
                    <img src={heart} alt="heart" style={{width:'4vw'}}/>
                    <h2 style={{fontSize: '32px', marginBottom: '0vh'}}>Get Support</h2>
                    <p style={{fontSize:'18px'}}>Unlock studio time and services to continue enhancing the potency of every item that you publish.</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', backgroundColor:'transparent', marginBottom:'80px'}}>
            <button style={ctaButtonStyle} onClick={() =>
                    loginWithRedirect({
                    redirectUri: process.env.REACT_APP_REDIRECTURL,  
                    })
                }>
                Get Started
            </button>
            </div>
        </div>
        {/* FAQ section */}
            <div style={{height: 'auto', paddingLeft: '80px'}}>
                <h2 style={{color: '#434289', fontSize: '48px', marginBottom:'60px', marginTop : '80px'}}>FAQ</h2>
                <FAQsContainer/>
            </div>
        </>
    );
}

export default ArtistLandingPage;

const SectionDiv = styled.div`
    position: relative;
    height:77vh;
    background-image: url('https://firebasestorage.googleapis.com/v0/b/staging-sacred-sound-f472b.appspot.com/o/Assets%2FArtistLandingPageBackgroundImage.png?alt=media&token=6896cce6-8c4a-44f3-91e6-7ef2fc2f51a7');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    overflow: hidden;
`;

const TintedOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ItalicText = styled.span`
    font-style: italic;
    font-size: 3.3rem;
    color: white;
    letter-spacing: -3.33px;
    font-family: Playfair;
`;