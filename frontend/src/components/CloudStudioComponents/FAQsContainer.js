import React, { useState } from 'react';
import styled from 'styled-components';
import navArrowDown from '../../assets/navArrowDown.png';
import navArrowUp from '../../assets/navArrowUp.png';

const FAQButton = styled.button`
    box-sizing: border-box;
    line-height: 1.6;
    color: #434289;
    padding: 15px 30px;
    border: 1px solid #D9D9D9;
    border-radius: 0px; 
    cursor: pointer;
    font-size: 18px;
    width: 66%; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    @media (max-width: 1200px){
      font-size: 15px;
      }
    @media (max-width: 768px){
    width: 100%; 
    font-size: 12px;
    }
`;

const FAQAnswer = styled.p`
    margin-top: 0px;
    box-sizing: border-box;
    color: #434289;
    font-size: 18px; 
    line-height: 1.6;
    padding: 15px 30px;
    width: 66%;
    border-left: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 0px;
    @media (max-width: 1200px){
      font-size: 15px;
      }
    @media (max-width: 768px){
      width: 100%; 
      font-size: 12px;
      }
`;

const createAnswerWithLink = (text, link, linkText) => {
  const parts = text.split(linkText);

  return (
    <>
      {parts[0]}
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: '#434289', textDecoration: 'underline' }}>
        {linkText}
      </a>
      {parts[1]}
    </>
  );
};

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div>
      <FAQButton onClick={toggle}>
        {question}
        <img src={isOpen ? navArrowUp : navArrowDown} alt={isOpen ? 'Collapse' : 'Expand'} />
      </FAQButton>
      {isOpen && <FAQAnswer>{answer}</FAQAnswer>}
    </div>
  );
};

// FAQs data array
const faqs = [
  {
    question: "What forms of content do you accept?",
    answer: createAnswerWithLink(
      "We accept studio recordings, music videos, meditations, video lessons, behind the scenes, and live concerts. For more information, check out our QA Guidelines.",
      "https://docs.google.com/document/d/1rBTkFOugxoAvXSaUzK9FXUSNrw9ODWCqTQdD-dyF2OM",
      "QA Guidelines"
    ),
  },
  {
    question: "What are Thanks coins and how can I use them?",
    answer: "Thanks coins are a form of currency at Sacred Sound. Each listener that subscribes to Sacred Sound will receive a monthly bundle of Thanks coins, which they can gift to artists. You can redeem Thanks coins for studio services at Sacred Sound.",
  },
  {
    question: "Will I get paid for music streamed on Sacred Sound?",
    answer: "Yes. Once we launch with a minimum of 30 artists and onboard our first paying subscribers, we will start paying out a percentage of revenue to artists based on streams of their content.",
  },
];

const FAQsContainer = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div style={{paddingBottom: '80px'}}>
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFAQ === index}
          toggle={() => toggleFAQ(index)}
        />
      ))}
    </div>
  );
};

export default FAQsContainer;
