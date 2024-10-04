import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

export default function PreRegisterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // To display errors
  const [success, setSuccess] = useState(null); // To display success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear success message
    
    try {
      const response = await axios.post(
        'https://lobster-app-ngpuz.ondigitalocean.app/api/storeEmailOnWaitlist',
        { email }, // Request body with email
        {
          headers: {
            'Content-Type': 'application/json', // Ensure correct headers
          },
        }
      );
      if (response.status === 200) {
        setSuccess('You have successfully registered!'); // Success message
      } else {
        setError('Failed to register. Please try again.'); // Handle non-200 responses
      }
    } catch (err) {
      setError('Error saving email: ' + err.message); // Display network errors
      console.error('Error saving email:', err);
    }
  };

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <p>Pre-register your email</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
      <button type="submit">Pre-register</button>
    </RegisterForm>
  );
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
