import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; // Update this import
import logo from '../assets/logo-white.png'
import userGroup from '../assets/userGroup.png';
import musicNote from '../assets/musicNote.png';
import heart from '../assets/heart-new.png'
import FAQsContainer from '../components/CloudStudioComponents/FAQsContainer';

export default function ArtistLandingPage() {
    const navigate = useNavigate(); // Update to useNavigate

    return (
        <MainContainer>
            <Banner>
                <BannerImage>
                    <img src='https://firebasestorage.googleapis.com/v0/b/staging-sacred-sound-f472b.appspot.com/o/Assets%2FArtistLandingPageBackgroundImage.png?alt=media&token=6896cce6-8c4a-44f3-91e6-7ef2fc2f51a7' alt='not loaded'></img>
                </BannerImage>
                <BannerBackground></BannerBackground>
                <Content>
                    <img src={logo} alt='not loaded'></img>
                    <div id='text-section'>
                        <p>
                        Join the Collective
                        </p>
                        <p id='second-text'>
                        Connect intimately with listeners that go deep
                        </p>
                        <button onClick={() => navigate('/artist-signup')}>GET STARTED</button>

                    </div>
                </Content>
            </Banner>
        
            <CommunitySection>
                <SecondarySection>
                    <p className='title'><b>A platform designed for your journey as a sacred music artist.</b></p>
                    <p className='content'>We pay artists directly and provide professional support to enhance the value of what you create.</p>

                </SecondarySection>
                <SecondarySection>
                    <video controls muted src={'https://storage.googleapis.com/staging-sacred-sound-f472b.appspot.com/introduction-video/Sacred-Sound-Explainer-Video.mp4'} type="video/mp4"></video>
                </SecondarySection>    
            </CommunitySection>
            <hr style={{color: '#D9D9D9', marginTop: '50px'}}></hr>

            <UserSection>
                <InnerSection>
                    <SecondarySection>
                        <UserContent>
                            <div id='inner-content'>
                                <p className='header'>Welcome to Your <br></br>Cloud Studio</p>
                                <p className='sub-header'>A platform for new cash flow steams, direct connection to listeners, and professional studio support from Sacred Sound Studios.</p>
                            </div>
                        </UserContent>
                    </SecondarySection>
                    <SecondarySection>
                        <Seekers>
                            <Seeker>
                                <div>
                                    <p style={{fontSize: '32px', margin: '0'}}><b>Create new revenue streams with your content.</b></p>
                                    <p style={{fontSize: '18px'}}>Upload your magic into our sacred music library, and get paid for every minute of content that gets viewed.</p> 

                                </div>
                            </Seeker>
                            <Seeker>
                                <div>
                                    <p style={{fontSize: '32px', margin: '0'}}><b>Expand through more intimate connection.</b></p>
                                    <p style={{fontSize: '18px'}}>Invite your listeners along deeper into your creative process through video lessons, events, behind the scenes, and more!</p> 

                                </div>
                            </Seeker>
                            <Seeker>
                                <div>
                                    <p style={{fontSize: '32px', margin: '0'}}><b>Earn professional studio support through your music.</b></p>
                                    <p style={{fontSize: '18px'}}>Gain tokens, ‘thanks coins,’ directly from listeners as they gain inspiration, which you can redeem for studio services.</p> 

                                </div>
                            </Seeker>
                        </Seekers>
                    </SecondarySection>

                </InnerSection>
            </UserSection>
            <hr style={{color: '#D9D9D9', marginBottom: '40px'}}></hr>

            <FeatureSection>
                <Title><b>Let’s Create Magic Together</b></Title>
                <p>Share sacred music and receive support from listeners you inspire.</p>
                <Features>
                    <Feature>
                        <img src={userGroup} alt='not loaded'></img>
                        <p className='feature-title'>Join the Artist Collective</p>    
                        <p className='discription'>Be one of up to 100 artists selected to join the Sacred Sound Artist Collective.</p>
                    </Feature>
                    <Feature>
                    <img src={musicNote} alt='not loaded'></img>

                        <p className='feature-title'>Publish Your Magic</p>
                        <p className='discription'>Reach the right audience for you and get paid for every minute of content that gets viewed.</p>
                  
                    </Feature>
                    <Feature>
                    <img src={heart} alt='not loaded'></img>

                        <p className='feature-title'>Get Support</p>
                        <p className='discription'>Unlock studio time and services to continue enhancing the potency of every item that you publish.</p>

                    </Feature>
                    <button onClick={() => navigate('/signup?artist=true')}>GET STARTED</button> // Update button action
        
                </Features>
            </FeatureSection>
            <hr style={{color: '#D9D9D9', marginTop: '40px'}}></hr>

            <FaqSection>
                <Title>FAQ</Title>
                <br/>
                <br/>
                <br/>
                <FAQsContainer/>

            </FaqSection>
        </MainContainer>
    )
}

const MainContainer = styled.div`

`

const Banner = styled.div`
    position: relative;
`
const BannerImage = styled.div`
    img{
        width: 100%;
    }
    @media (max-width: 768px) {
        img{
            height: 320px;
        }  
    }
`

const BannerBackground = styled.div`
    position: absolute;
    height: 100%;
    top: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.3);
`
const Content = styled.div`
    position: absolute;
    text-align: left;
    diplay: flex;
    justify-content: center;
    top: 20px;
    margin-left: 20px;
    img{
        width: 250px;
    }
    #text-section{
        margin-top: 50%;
        margin-left: 5%;
    }
    p{
        color: white;
        font-size: 48px;
        font-family: "Playfair Display", serif;
    }
    #second-text{
        font-size: 24px
    }
    @media (max-width: 1300px){
        #text-section{
            margin-top: 8%;
        }
    }
    @media (max-width: 768px) {
        img {
            width: 200px;    
        }
        p {
            font-size: 30px;
        }
        #second-text{
            font-size: 15px
        }
        button{
            width: 60%;
        }
        #text-section{
            margin-top: -10px;
        }
    }
    @media (max-width: 768px) {
        #text-section{
            margin-top: -25px;
        }
    }
    button {
        border-radius: 0px;
    }
`

const FeatureSection = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    width: 90%;
    margin: auto;

`
const Title = styled.div`
    font-size: 48px;
    font-family: "Playfair Display", serif;
`

const Features = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 100%;
    button {
        margin: auto;
        margin-top: 50px;
        width: 33.33%;
        border-radius: 0px;
    }
    @media (max-width: 768px) {
        button {
            width: 100%;
        }
    }
`
const Feature = styled.div` 
    width: 33.33%;
    .feature-title {
        font-size: 26px;
        font-family: "Playfair Display", serif;
    }
    .discription{
        font-size: 18px;
    }
    @media (max-width: 768px){
        width: 100%;
    }
   
`

const CommunitySection = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: auto;
    justify-content: space-between;
    margin-top: 30px;
`

const SecondarySection = styled.div`
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .title{
        font-size: 48px;
    }
    .content {
        font-size: 18px;
    }
    video{
       width: 100%;
    }
    @media (max-width: 768px){
        width: 100%;
    }
    @media (max-width: 1100px){
        .title{
            font-size: 32px;
        }
    }
`

const UserSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: auto;
    justify-content: space-between;
    margin-top: 30px;
    
    @media (max-width: 768px){
        height: auto;
    }
`
const InnerSection = styled.div` 
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin: auto;
    justify-content: space-between;
    width: 90%;
`
const UserContent = styled.div`
    .header{
        font-size: 50px;
        color: white;
    }
    .sub-header{
        font-size: 24px;
        color: white;
    }
    #inner-content{
        background-color: #A3C4A3;
        padding: 50px;
        width: 70%;
        @media (max-width: 768px){
            width: 100%;
            padding: 0;
            padding-left: 10px;
            padding-top: 50px;
            padding-bottom: 50px;
        }
    }

    @media (max-width: 1100px){
        width: 100%; 
        .header{
            font-size: 38px;
        }
        .sub-header{
            font-size: 18px;
        }
    }

    @media (max-width: 880px){
        width: 100%; 
        .header{
            font-size: 32px;
        }
        .sub-header{
            font-size: 18px;
        }
    }
`

const Seekers = styled.div`
    margin-top: 80px;
    margin-bottom: 80px;
    @media (max-width: 768px){
        margin-top: 60px;
    }
`

const Seeker = styled.div` 
    display: flex; 
    gap: 20px;  
    margin-bottom: 30px;
`

const RegisterForm = styled.div`
    text-align: center;
    margin-bottom: 50px;
    font-family: "Playfair Display", serif;
    p{
        font-size: 48px;
    }
    form{
        width: 450px;
        margin: auto;
        input{
            width: 442px;
            height: 40px;
            margin-left: 0;
            @media (max-width: 500px) {
                width: 90%;
            }
        }
        input::placeholder {
            text-align: center;
        }
        .checkbox{
            width: 20px;
            height: 20px;
            margin: 0;
        }
        label{
            align-items: center;
            margin-bottom: 0;
            margin-left: 2px;
        }
        @media (max-width: 500px) {
            width: 90%;
        }
        button{
            width: 450px;
            border-radius: 0;
            margin-top: 30px;
            @media (max-width: 500px) {
                width: 90%;
            }
        }
    }
`

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 10px;
    float: left;
    @media (max-width: 500px) {
        padding-left: 20px;
    }
`

const FaqSection = styled.div`
width: 90%;
margin: auto;
margin-top: 50px;
`