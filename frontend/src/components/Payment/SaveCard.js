import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Visa from "../../assets/visa.svg";
import American from "../../assets/american-express.svg";
import MasterCard from "../../assets/mastercard.svg";
import CardIcon2 from "../../assets/credit-card-gray.svg";
import Polygon from "../../assets/Polygon-9.svg";
import CVV from "../../assets/CVV.svg";
import { encryptData } from "../../utils/encryption";
import BackButton from "../common/BackButton";

function SaveCard() {
  const [toggle, setToggle] = useState(false);
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    card: "",
    expire: "",
    cvv: "",
    nameOnCard: "",
    userId: "65e073195bdcf11766875821",
  });

  const tilopay = useRef(null);

  function fetchCards(userId) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getAllCards/${userId}`)
      .then((res) => res.json())
      .then((data) => setCards(data.cards));
  }
  useEffect(() => {
    const tilopayObj = window.Tilopay;
    tilopay.current = tilopayObj;
    fetchCards("65e073195bdcf11766875821");
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (formData.card && formData.expire && formData.cvv) {
      const cardCompany = (await tilopay.current.getCardType()).message;
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postNewCardForPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nameOnCard: encryptData(formData.nameOnCard),
          card: encryptData(formData.card),
          cardCompany: encryptData(cardCompany),
          expire: encryptData(formData.expire),
          cvv: encryptData(formData.cvv),
          userId: formData.userId
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          fetchCards("65e073195bdcf11766875821");
          setFormData({
            card: "",
            expire: "",
            cvv: "",
            nameOnCard: "",
            userId: "65e073195bdcf11766875821",
          });
        });
    } else {
      console.log("error");
    }
  };
  return (
    <SaveCardWrapper>
      <div style={{marginBottom: '80px'}}>
        <BackButton black={true}/>
      </div>
      <Header>
        <h1>Saved payment cards</h1>
        <p>Manage your payment details for one-time purchases. </p>
      </Header>
      <MyCards>
        <h1>My cards</h1>
        {cards.length > 0 ? (
          cards.map((card) => {
            return (
              <div className="card-tab" key={card._id}>
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
                <div className="arrow-img">
                  <img src={Polygon} alt="polygon" />
                </div>
              </div>
            );
          })
        ) : (
          <p style={{color: 'red'}}>Any card is not saved</p>
        )}

        {!toggle && (
          <AddCardTab>
            <div className="wallet-img">
              <img src={CardIcon2} alt="visa" />
            </div>
            <div className="middle-content">
              <span>.... 0000 | MM/YY</span>
            </div>

            <div className="card-cta">
              <button onClick={() => setToggle(!toggle)}>Add Card</button>
            </div>
          </AddCardTab>
        )}
        {toggle && (
          <AddCardDetails>
            <h4>Credit or debit card</h4>
            <CardLogo>
              <img src={Visa} alt="icon" />
              <img src={MasterCard} alt="icon" />
              <img src={American} alt="icon" />
            </CardLogo>
            <PaymentDetails>
              <h2>Payment details</h2>
              <form className="form-wrapper">
                <div className="form-group">
                  <label>Card number</label>
                  <input
                    type="text"
                    id="tlpy_cc_number"
                    name="tlpy_cc_number"
                    placeholder="1234 1234 1234 1234"
                    value={formData.card}
                    onChange={(event) => {
                      setFormData({ ...formData, card: event.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Name on card</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.nameOnCard}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        nameOnCard: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex-col">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expire}
                      onChange={(event) => {
                        let newValue = event.target.value;

                        newValue = newValue.replace(/\D/g, "");

                        newValue = newValue.slice(0, 4);

                        if (newValue.length >= 2) {
                          newValue = `${newValue.slice(0, 2)}/${newValue.slice(
                            2
                          )}`;
                        }
                        setFormData({
                          ...formData,
                          expire: newValue,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="cvv"
                      value={formData.cvv}
                      onChange={(event) => {
                        setFormData({ ...formData, cvv: event.target.value });
                      }}
                    />
                    <img src={CVV} alt="icon" />
                  </div>
                </div>
                <div className="form-group checkbox-outer">
                  <input type="checkbox" id="check-text" />
                  <label htmlFor="check-text">
                    Save card for future one-time purchases and subscriptions.
                    This won't affect how you pay for existing subscriptions and
                    can be managed anytime in your Account page.
                  </label>
                </div>
              </form>
              <div className="card-actions">
                <button className="cancel-btn" onClick={() => setToggle(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={onSubmit}>
                  Save
                </button>
              </div>
            </PaymentDetails>
          </AddCardDetails>
        )}
      </MyCards>
    </SaveCardWrapper>
  );
}

export default SaveCard;

const SaveCardWrapper = styled.div`
  padding: 20px;
`;
const Header = styled.div`
  h1 {
    font-size: 32px;
    line-height: 44px;
    font-weight: 400;
    margin-bottom: 18px;
  }
  p {
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
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
    width: 640px;
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
const AddCardTab = styled.div`
  padding: 17px 10px;
  width: 640px;
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
const AddCardDetails = styled.div`
  padding: 17px 10px;
  width: 640px;
  border: 1px solid rgb(217, 217, 217);
  border-radius: 12px;
  @media (max-width: 767px) {
    max-width: calc(100% - 20px);
  }
`;
const CardLogo = styled.div``;
const PaymentDetails = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
  .form-wrapper {
    display: flex;
    flex-direction: column;
    .flex-col {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      max-width: 100%;

      img {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 12px;
        top: 38px;
      }
    }
    .form-group {
      margin-bottom: 20px;
      position: relative;
      width:100%;
      label {
        display: block;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
      }
      input {
        height: 50px;
        border: 1px solid #d9d9d9;
        padding: 5px 15px;
        font-size: 16px;
        font-weight: 400;
        width:100%;
        box-sizing:border-box;
        &::placeholder {
          color: #d9d9d9 !important;
        }
      }
    }
    .checkbox-outer {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      input {
        width: 40px;
        height: 20px;
        cursor: pointer;
      }
      label {
        cursor: pointer;
        font-size: 16px;
        margin-bottom: 0 !important;
      }
    }
  }
  .card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin: 30px 0;
    button {
      border: 1px solid #434289;
      height: 50px;
      min-width: 133px;
    }
    .cancel-btn {
      background-color: transparent;
      color: #434289;
    }
    .save-btn {
      box-shadow: 0px 4px 4px 0px #00000040;
    }
  }
`;
