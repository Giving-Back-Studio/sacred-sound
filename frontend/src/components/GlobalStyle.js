import { createGlobalStyle } from 'styled-components';

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
        font-family: Playfair;
        font-size: var(--heading-one-font-size);
        font-weight: 500;
    }

    h2 {
        font-size: var(--heading-two-font-size);
        font-family:Playfair;
        font-weight: 200;
        color: #434289;
    }


    h3 {
        font-size: var(--heading-three-font-size);
        font-family:Playfair;
        font-weight: 150;
    }

    /* Set the font family for paragraphs */
    p {
        font-size: var(--text-font-size); /* Adjusted from 14px */
        line-height: 1.5;
        margin-bottom: 1rem;
        color: #434289;
        font-family: Montserrat;
    }

    input[type=text] {
        font-family: Outfit;
        font-size: var(--text-font-size);
        border: 2px solid #D9D9D9;
        color: #434289;
        :focus {
            outline: none;
            border: 2px solid #434289;
        }
    }
    textarea {
        font-family: Outfit;
        border: 2px solid #D9D9D9;
        color: #434289;
        font-size: var(--text-font-size);
        :focus {
            outline: none;
            border: 2px solid #434289;
        }
    }
    div {
        font-family: Outfit;
        color: #434289;
        background-color: rgb(248, 248, 248);;
        font-size: var(--text-font-size);
    }
    label {
        color: #434289;
        font-family: Outfit;
        color: #434289;
        font-size: var(--text-font-size);
        margin-bottom: 16px;
    }
    span {
        font-family: Montserrat;
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
        font-family: Montserrat;
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
`;