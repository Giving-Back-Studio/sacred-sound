import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* Define the font families */
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Outfit:wght@300;400;500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Outfit:wght@300;400;500&family=Playfair+Display:wght@400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=Open+Sans&family=Outfit:wght@300;400;500&family=Playfair+Display:wght@400;700&display=swap');


    :root {
        /* Define your custom properties here */
        --base-font-size: 16px; /* Base font size */
        --text-font-size: 0.875rem; /* Text font size, equivalent to 14px */
        --heading-one-font-size: 2.1875rem; /* H1 font size */
        --heading-two-font-size: 1.5625rem;  /* H2 font size */
        --heading-three-font-size: 1.125rem;
        /* Add more custom properties as needed */
    }

    html {
        font-size: var(--base-font-size); /* Sets the base font size */
    }

    h1 {
        font-family: 'Playfair';
        font-size: var(--heading-one-font-size);
        font-weight: 500;
    }

    h2 {
        font-size: var(--heading-two-font-size);
    }


    h3 {
        font-size: var(--heading-three-font-size);
    }

    /* Set the font family for paragraphs */
    p {
        font-size: var(--text-font-size); /* Adjusted from 14px */
        line-height: 1.5;
        margin-bottom: 1rem;
        color: #434289;
    }
    /* Set the font family for buttons
    button {
        font-family: 'Outfit', sans-serif;
        font-size: var(--text-font-size);
        font-weight: 100;
        line-height: 1.5;
        letter-spacing: 0.7px;
    } */
    input[type=text] {
        font-family: 'Outfit', sans-serif;
        font-size: var(--text-font-size);
        border: 2px solid #D9D9D9;
        color: #434289;
        :focus {
            outline: none;
            border: 2px solid #434289;
        }
    }
    textarea {
        font-family: 'Outfit', sans-serif;
        border: 2px solid #D9D9D9;
        color: #434289;
        font-size: var(--text-font-size);
        :focus {
            outline: none;
            border: 2px solid #434289;
        }
    }
    div {
        font-family: 'Outfit', sans-serif;
        color: #434289;
        //background-color: #FFFFFF;
        font-size: var(--text-font-size);
    }
    label {
        color: #434289;
        font-family: 'Outfit', sans-serif;
        color: #434289;
        font-size: var(--text-font-size);
        margin-bottom: 16px;
    }
    span {
        font-family: 'Montserrat', sans-serif;
        color: #434289;
        font-size: var(--text-font-size);
    }
    select {
        color: #434289;
        padding: 22px;
        font-size: var(--text-font-size);
        border: 2px solid #434289;
    }
    input::placeholder, textarea::placeholder {
        color: #434289; /* Change to your desired color */
        opacity: 1; /* Optional: Adjust the opacity as needed */
    }
    button {
        font-family:'Montserrat';
        border: none;
        color: rgb(245, 245, 245);
        background-color: rgb(67, 66, 137);
        border-radius: 33px;
        padding: 12px 30px;
        cursor: pointer;
        font-size: var(--text-font-size);
        height: 6vh;
        align-items: center;
    }
    .font-montserrat{
        font-family: 'Montserrat', sans-serif;
    }
    .react-responsive-modal-closeButton{
            right: auto;
            top: 10px;
            .close-icon{
                font-size: 18px;
                text-decoration: underline;
                font-weight: 400;
            }
        }
    .give-thanks-modal{
       width: 730px;
       padding: 40px;
       @media (max-width:991px){
        width: calc(80% - 3rem);
        max-width: 100%
       }
       @media (max-width:575px){
        padding: 30px;
        width: calc(85% - 3rem);
       } 
        h2{
        font-size: 18px;
        text-transform: uppercase;
        margin-top: 50px;
        font-family: 'Montserrat', sans-serif;
        }
        span{
            font-size: 16px;
            font-weight: 300;
            font-family: 'Montserrat', sans-serif;
            @media (max-width:575px){
                font-size: 14px;
            } 
        }
        .track-info{
            display: flex;
            align-items: center;
            gap: 15px;
            margin-top: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #434289;
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                @media (max-width:575px){
                    width: 60px;
                    height: 60px;
                } 
            }
            h1{
                font-size: 24px;
                font-weight: 400;
                margin: 6px 0px;
                @media (max-width:575px){
                   font-size: 20px;
                } 
            }
            
        }
        .balance-info{
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            @media (max-width:575px){
              flex-direction: column;
              align-items: flex-start;
            } 
            h4{
                margin-top: 5px;
                font-size: 18px;
            }
            .after-gift{
                text-align: right;
                @media (max-width:575px){
                    text-align: left;
                } 
            }
        }
        .form-outer{
            display: flex;
            align-items: center;
            flex-direction: column;
            margin-bottom: 30px;
            @media (max-width:575px){
                margin-bottom: 10px;
            } 
            input{
                height: 40px;
                width: 500px;
                max-width: 100%;
                border: 1px solid #D9D9D9;
                text-align: center;
                padding: 8px;
                font-size: 34px;
                font-weight: 700;
                display: block;
                &::placeholder{
                    opacity: 0.3;
                }
                @media (max-width:575px){
                  font-size: 24px;
                  height: 34px;
                }
            }
            button{
              margin-top: 50px;
              height: 50px;
              text-transform: uppercase;
              font-family: 'Montserrat', sans-serif;
              min-width: 185px;
              box-shadow: 0 4px 4px 0 #00000040;
              @media (max-width:575px){
                margin-top: 30px;
              }
            }
        }
    }
    @keyframes customEnterModalAnimation {
        0% {
            transform: scale(0.2);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes customLeaveModalAnimation {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.2);
        }
    }
`;
