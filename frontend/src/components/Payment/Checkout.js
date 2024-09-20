import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../assets/check.svg";
import Visa from "../../assets/visa.svg";
import American from "../../assets/american-express.svg";
import MasterCard from "../../assets/mastercard.svg";
import CardIcon2 from "../../assets/credit-card-gray.svg";
import TilopayPaymentForm from "./TilopayPaymentForm";
import BackButton from "../common/BackButton";

const Checkout = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const amount = queryParams.get("amount");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({index: 0, cardId: ''})
  const plan = queryParams.get("plan") === "1" ? "Year" : "Month";
  useEffect(() => {
    fetchCards('65e073195bdcf11766875821');
  }, []);


  function fetchCards(userId) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getAllCards/${userId}`)
      .then((res) => res.json())
      .then((data) => {setCards(data.cards);setSelectedCard({index: 0, cardId: data.cards[0]._id})});
  }
 
  return (
    <MangePlanWrapper>
       <div style={{marginBottom: '80px'}}>
        <BackButton black={true}/>
      </div>
      <div>
        <h1>Checkout</h1>
        <ManagePlanMain>
          <MngePlanRight>
            <div className="flexible-plan-card">
              <h2>Flexible Plan</h2>
              <p>
                <sup>$</sup>
                {amount}
                <span>per {plan}</span>
              </p>
            </div>
            <div className="flexible-content">
              <ul>
                <li>
                  <img src={CheckIcon} alt="check-icon" />
                  Unlimited access to it all.
                </li>
                <li>
                  <img src={CheckIcon} alt="check-icon" />
                  VISphere ride every 3 months.
                </li>
                <li>
                  <img src={CheckIcon} alt="check-icon" />
                  480 thanks!coins to gift to artists.
                </li>
              </ul>
            </div>
                     </MngePlanRight>
        </ManagePlanMain>
      </div>
      <AddCardDetails>
        <h4>Credit or debit card</h4>
        <CardLogo>
          <img src={Visa} alt="icon" />
          <img src={MasterCard} alt="icon" />
          <img src={American} alt="icon" />
        </CardLogo>
        <MyCards>
        {cards.length > 0 ? (
          cards.map((card, index) => {
            return (
              <div className="card-tab" key={card._id} onClick={() => setSelectedCard({index: index,cardId: card._id})}>
                <input type="radio"  checked={index === selectedCard.index ? true: false}></input>
                <div className="visa-img">
                  <img
                    src={
                      card.cardCompany === "visa"
                        ? Visa
                        : card.cardCompany === "mastercard"
                        ? MasterCard
                        : American
                    }
                    alt="card type"
                  />
                </div>
                <div className="middle-content">
                  <p>{card.cardCompany}</p>
                  <span>{`.... ${card.card} | ${
                    card.expire
                  }`}</span>
                </div>
              
                
              </div>
            );
          })
        ) : (
          <p style={{color: 'red'}}>Any card is not saved</p>
        )}
        </MyCards>
          <div onClick={() => setSelectedCard({index: -1, cardId: ''})}>
          <AddCardTab>
            <input type="radio" checked={-1 === selectedCard.index ? true: false}></input>
            <div className="wallet-img">
              <img src={CardIcon2} alt="visa" />
            </div>
            <div className="middle-content">
              <span>.... 0000 | MM/YY</span>
            </div>

            <div className="card-cta" >
              <button>New Card</button>
            </div>
          </AddCardTab>
          </div>
        
        {/* )} */}
         <TilopayPaymentForm selectedCard={selectedCard}/>
      </AddCardDetails>
    </MangePlanWrapper>
  );
};

export default Checkout;
const MangePlanWrapper = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  > h1 {
    font-size: 42px;
    font-weight: 400;
    line-height: 44px;
  }
`;
const ManagePlanMain = styled.div`
  display: flex;
  flex-direction: row;
`;

const MngePlanRight = styled.div`
  width: 360px;
  box-sizing: border-box;
  .flexible-plan-card {
    position: relative;
    width: 100%;
    height: 275px;
    background: #a3c4a3;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-weight: 400;
      line-height: 42px;
      font-size: 30px;
      color: white;
      width: 105px;
      text-align: center;
    }
    p {
      position: absolute;
      bottom: 15px;
      left: 22px;
      color: white;
      font-size: 24px;
      font-weight: 500;
      sup {
        font-size: 14px;
        font-weight: 400;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: white;
        display: block;
      }
    }
  }
  .flexible-content {
    padding: 20px 10px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        font-size: 16px;
        font-weight: 400;
        line-height: 32px;
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
        }
      }
    }
  }
  .PlanCta {
    font-size: 16px;
    font-weight: 700;
    color: white;
    padding: 0 10px;
  }
`;

const AddCardDetails = styled.div`
  padding: 17px 10px;
  width: 640px;
  margin: 20px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 12px;
  @media (max-width: 767px) {
    max-width: calc(100% - 20px);
  }
`;
const CardLogo = styled.div``;

const AddCardTab = styled.div`
  padding: 17px 10px;
  width: 610px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    max-width: calc(100% - 20px);
  }
  .middle-content {
    width: 78%;
    @media (max-width: 767px) {
      width: 100%;
    }
    span {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      color: #616567;
    }
  }
  .card-cta {
    button {
      background: transparent;
      color: rgb(67, 66, 137);
      padding: 0;
      height: auto;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const MyCards = styled.div`
  margin-top: 78px;
  h1 {
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
  }
  .card-tab {
    padding: 17px 10px;
    width: 610px;
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      max-width: calc(100% - 20px);
    }
    .middle-content {
      width: 89%;
      p {
        margin: 0;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
      }
      span {
        font-size: 16px;
        line-height: 20px;
        font-weight: 700;
        display: block;
        margin-top: 10px;
      }
    }
    .arrow-img {
      img {
        cursor: pointer;
      }
    }
  }
`;