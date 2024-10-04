import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SacredSoundLogo from "../assets/WelcomeLogo.svg";
import Visa from "../assets/visa.svg";
import CardIcon2 from "../assets/credit-card-gray.svg";
import CVV from "../assets/CVV.svg";
import American from "../assets/american-express.svg";
import MasterCard from "../assets/mastercard.svg";
import { encryptData } from "../utils/encryption";
import Polygon from "../assets/Polygon-9.svg";

import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

export default function PaymentDetail() {
  const [toggle, setToggle] = useState(false);
  const [cards, setCards] = useState([]);
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
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

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const progressTrack = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
          {
            userId: userEmail,
            currentStep: 3,
            isOnboardingStepsPending: false,
          }
        );
        navigate("/studio");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/topics");
        } else {
          console.log("Error:", error.message);
        }
      }
    };
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
          userId: formData.userId,
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
        })
        .then(progressTrack());
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userEmail) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/b_getUserExist/${userEmail}`
          );
          if (
            response.data.user.isOnboardingStepsPending &&
            response.data.user.currentOnBoardingStep === 2
          ) {
            await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/PostUserOnboardingProgress`,
              {
                userId: userEmail,
                currentStep: 3,
                isOnboardingStepsPending: true,
              }
            );
          } else {
            navigate("/studio");
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/topics");
        } else {
          console.log("Error:", error.message);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <TopicWrapper>
      <img className="welcome-logo" src={SacredSoundLogo} alt="logo" />
      <div className="section-outer d-flex">
        <PaymentDetails>
          <h2>Payment details</h2>
          <p>
            Your payment details are required for a seamless free trial
            experience. Rest assured, you won't be charged until after your
            trial ends, and you can cancel anytime
          </p>
          <form className="form-wrapper">
            <CardType>
              <CardLogo>
                <img src={Visa} alt="icon" />
                <img src={MasterCard} alt="icon" />
                <img src={American} alt="icon" />
              </CardLogo>
              <h4>Credit or debit card</h4>
            </CardType>

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
              <div className="form-group expiry-box">
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
                      newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
                    }
                    setFormData({
                      ...formData,
                      expire: newValue,
                    });
                  }}
                />
              </div>
              <div className="form-group cvv-box">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="cvv"
                  value={formData.cvv}
                  onChange={(event) => {
                    setFormData({ ...formData, cvv: event.target.value });
                  }}
                />
              </div>
            </div>
            <div className="form-group checkbox-outer">
              <input type="checkbox" id="check-text" />
              <label htmlFor="check-text">
                Save card for future one-time purchases and subscriptions. This
                won't affect how you pay for existing subscriptions and can be
                managed anytime in your Account page.
              </label>
            </div>
          </form>
          {/* <div className="card-actions">
                <button className="cancel-btn" onClick={() => setToggle(false)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={onSubmit}>
                  Save
                </button>
              </div> */}
        </PaymentDetails>
        <TopicFooter className="topic-footer">
          <button className="btn btn-send" type="button" onClick={onSubmit}>
            Discover Your Sound Sanctuary
          </button>
        </TopicFooter>
      </div>
    </TopicWrapper>
  );
}

const TopicWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #434289;

  .d-flex {
    display: flex;
  }
  .align-item-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .welcome-logo {
    position: absolute;
    top: 40px;
    left: 40px;
  }
  .section-outer {
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    width: 638px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 1400px) {
      padding: 0 24px;
      height: 100%;
      padding: 200px 0 100px;
    }
    @media (max-width: 767px) {
      width: 100%;
      padding: 150px 24px 50px;
    }
    h1 {
      font-size: 29px;
      font-weight: 400;
      margin-bottom: 50px;
      color: #fff;
      @media (max-width: 575px) {
        font-size: 20px;
      }
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

const TopicFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 45px;

  .btn-send {
    border: 1px solid #fff;
    min-width: 180px;
    height: 50px;
    font-size: 14px;
    font-weight: 500;
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

const PaymentDetails = styled.div`
  h2 {
    font-family: "Playfair Display", serif;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
  }
  p {
    font-family: "Montserrat", serif;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    @media (max-width: 575px) {
      font-size: 14px;
    }
  }
  .form-wrapper {
    border: 1px solid #fff;
    color: #ffffff;
    flex-direction: column;
    padding: 25px;
    margin-top: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    .flex-col {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      width: 115px;
      @media (max-width: 575px) {
        width: 100%;
      }
    }
    .form-group {
      margin-bottom: 30px;
      position: relative;
      width: 100%;
      label {
        display: block;
        font-family: "Montserrat", serif;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 10px;
      }
      input {
        height: 50px;
        border: 1px solid #d9d9d9;
        background-color: transparent;
        padding: 5px 15px;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
        box-sizing: border-box;
        &::placeholder {
          color: #fff !important;
        }
      }
      &.expiry-box {
        min-width: 115px;
        @media (max-width: 575px) {
          min-width: 45%;
        }
      }
      &.cvv-box {
        min-width: 180px;
        @media (max-width: 575px) {
          min-width: 45%;
        }
      }
    }
    .checkbox-outer {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      input[type="checkbox"] {
        display: none;
        width: 40px;
        height: 20px;
        cursor: pointer;
        &:checked + label {
          &::after {
            content: "";
            display: block;
            position: absolute;
            top: 2px;
            left: 8px;
            width: 5px;
            height: 12px;
            border: solid #fff;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
      }
      label {
        cursor: pointer;
        position: relative;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
        font-family: "Montserrat", sans-serif;
        margin-bottom: 0 !important;
        display: contents;
        line-height: 1.3;
        @media (max-width: 575px) {
          font-size: 14px;
          line-height: 1.5;
        }
        &::before {
          content: "";
          -webkit-appearance: none;
          background-color: transparent;
          border: 1px solid #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
            inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
          padding: 10px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 5px;
        }
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

const CardLogo = styled.div``;

const CardType = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  h4 {
    font-family: "Montserrat", serif;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }
`;