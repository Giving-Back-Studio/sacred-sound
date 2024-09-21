import React, { useRef, useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import bannerImage from '../assets/landing-banner.png'
import logo from '../assets/logo-white.png'
import harmonium from '../assets/harmonium.png'
import user from '../assets/user.png'
import workshop from '../assets/workshop.png'


export default function LandingPage() {
  const registerFormRef = useRef(null);
  const [email, setEmail] = useState('');

  const scrollToRegisterForm = () => {
    registerFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/storeEmailOnWaitlist`, {
        email,
        timestamp: new Date()
      });
      alert('Thank you for registering!');
      setEmail('');
    } catch (error) {
      console.error('Error saving email:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <MainContainer>
        <Banner>
            <BannerImage>
                <img src={bannerImage} alt='not loaded'></img>
            </BannerImage>
            <BannerBackground></BannerBackground>
            <Content>
                <img src={logo} alt='not loaded'></img>
                <div id='text-section'>
                    <p>
                    Resonate with higher vibrations.
                    </p>
                    <p id='second-text'>
                    Connect with sacred music and artists that inspire you.
                    </p>
                    <button onClick={scrollToRegisterForm}>JOIN THE WAITLIST</button>

                </div>
            </Content>
        </Banner>
        <FeatureSection>
            <Title>It's time to elevate sacred music together.</Title>
            <Features>
                <Feature>
                    <p className='feature-title'>Discover</p>    
                    <p className='discription'>Immerse yourself in a curated collection of transformative sacred music from diverse artists.</p>
                </Feature>
                <Feature>
                    <p className='feature-title'>Connect</p>
                    <p className='discription'>Engage with fellow community members, share insights, and foster connections in a supportive space.</p>

                </Feature>
                <Feature>
                    <p className='feature-title'>Elevate</p>
                    <p className='discription'>Unlock premium content, live sessions, and behind-the-scenes experiences.</p>

                </Feature>
            </Features>
        </FeatureSection>
        <hr style={{color: '#D9D9D9'}}></hr>
        <CommunitySection>
            <SecondarySection>
                <p className='title'>Join the Sacred Sound Community</p>
                <p className='content'>We understand what it's like to long for a better way to connect with sacred music. We are creating a space that raises the vibration of humanity through quality and diverse sacred music, and intimate connection with artists.</p>
            </SecondarySection>
            <SecondarySection>
                <video controls muted src={'https://storage.googleapis.com/staging-sacred-sound-f472b.appspot.com/introduction-video/Sacred-Sound-Explainer-Video.mp4'} type="video/mp4"></video>
            </SecondarySection>    
        </CommunitySection>
        <UserSection>
            <InnerSection>
                <SecondarySection>
                    <UserContent>
                        <p className='header'>Your Spiritual Sanctuary</p>
                        <p className='sub-header'>Designed to inspire high vibrations.</p>
                    </UserContent>
                </SecondarySection>
                <SecondarySection>
                    <Seekers>
                        <Seeker>
                            <img src={harmonium} alt='not loaded' style={{width: '60px', height: '50px'}}></img>
                            <div>
                                <p style={{fontSize: '32px', margin: '0'}}>For sacred music seekers</p>
                                <p style={{fontSize: '16px'}}>Discover new music and enjoy mindfully curated content on Sacred Sound's library and online concert hall.</p> 

                            </div>
                        </Seeker>
                        <Seeker>
                            <img src={workshop} alt='not loaded' style={{width: '60px', height: '50px'}}></img>
                            <div>
                                <p style={{fontSize: '32px', margin: '0'}}>For workshop leaders</p>
                                <p style={{fontSize: '16px'}}>Enhance your next offering with our expansive library of meditations, sound journeys, and even DJ sets.</p> 

                            </div>
                        </Seeker>
                        <Seeker>
                            <img src={user} alt='not loaded' style={{width: '60px', height: '50px'}}></img>
                            <div>
                                <p style={{fontSize: '32px', margin: '0'}}>For students and emerging artists</p>
                                <p style={{fontSize: '16px'}}>Develop your craft by connecting with lessons, offerings, and events created by the artists who inspire you.</p> 

                            </div>
                        </Seeker>
                    </Seekers>
                </SecondarySection>

            </InnerSection>
        </UserSection>
        <RegisterForm ref={registerFormRef}>
            <p>Be the first to know when we launch!</p> 
            <form onSubmit={handleSubmit}>
                    <input 
                      type='email' 
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                    <button type="submit">PRE-REGISTER</button>
            </form>
        </RegisterForm>
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
    text-align: center;
    diplay: flex;
    width: 100%;
    justify-content: center;
    top: 20px;
    margin: auto;
    img{
        width: 350px;
    }
    #text-section{
        margin-top: 10%;
    }
    p{
        color: white;
        font-size: 48px;
        font-family: "Playfair Display", serif;
    }
    #second-text{
        font-size: 24px
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
    width: 95%;
    margin-left: 3%;
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
    gap: 10px;
`
const Feature = styled.div` 
    width: 32%;
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
    width: 95%;
    margin: auto;
    justify-content: space-between;
    margin-top: 30px;
`

const SecondarySection = styled.div`
    width: 48%;
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
    background-color: #A3C4A3;
    justify-content: space-between;
    margin-top: 30px;
    p{
        color: white;
    }
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
    width: 95%;
`
const UserContent = styled.div`
    width: 600px; 
    .header{
        font-size: 50px;
    }
    .sub-header{
        font-size: 24px;
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
