import React, { useState } from "react";
import AddCircle from "../../assets/add-circled-outline.svg";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import BackButton from "../common/BackButton";

const tabs = [
  {
    id: 1,
    tabTitle: "Yearly",
    subTabTitle: "Recommended",
    title: "Unlimited Access to it All",
    content: "Flexible Community Subscription",
    isActive: true,
    min: 88,
    max: 888,
  },
  {
    id: 2,
    tabTitle: "Monthly",
    subTabTitle: "",
    title: "Unlimited Access to it All",
    content: "Flexible Community Subscription.",
    isActive: false,
    min: 8,
    max: 88,
  },
];
function Subscribe() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("1");
  const [TabData, setTabData] = useState(tabs);
  const [price, setPrice] = useState(88);

  const handleTabClick = (e) => {
    const tabId = e.target.id;
    const updatedTabs = TabData.map((tab) => {
      if (tab.id === parseInt(tabId)) {
        return {
          ...tab,
          isActive: true,
        };
      } else {
        return {
          ...tab,
          isActive: false,
        };
      }
    });
    const defaultPrice = TabData.find((tab) => tab.id === parseInt(tabId)).min;
    setPrice(defaultPrice);
    setCurrentTab(tabId);
    setTabData(updatedTabs);
  };
  

  const savePlan = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/save-plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        amount: price,
        type: currentTab === "1" ? "Year" : "Month",
        userId: '65e073195bdcf11766875821'
      }),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data);navigate(`/myAccount/checkout?amount=${price}&plan=${currentTab}`)})
  }
  return (
    <SubscibeWrapper>
       <div style={{marginBottom: '80px'}}>
        <BackButton black={true}/>
      </div>
      <HeadingSection>
        <h2>Unlock full access</h2>
        <p>
          Sacred Music from the artists you know and love. Amazing new artists
          to discover. Live concerts, video lessons, immersive experiences. How
          deep do you want to go?
        </p>
      </HeadingSection>
      <div>
        <CardHeader>
          {TabData.map((tab, i) => (
            <>
              <button
                className={tab.isActive ? "active" : ""}
                key={i}
                id={tab.id}
                disabled={currentTab === `${tab.id}`}
                onClick={handleTabClick}
              >
                <span>{tab.tabTitle}</span>
                <span>{tab.subTabTitle}</span>
              </button>
            </>
          ))}
        </CardHeader>
        <CardBody>
          {TabData.map(
            (tab, i) =>
              currentTab === `${tab.id}` && (
                <>
                  <div key={i} className="title">
                    <h6>{tab.title}</h6>
                    <p>{tab.content}</p>
                  </div>
                  <div className="input-wrapper">
                    <div>
                      <input
                        type=" text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <p>per {tab.tabTitle === "Yearly" ? "year" : "month"}</p>
                      <span>$</span>
                    </div>
                    <img src={AddCircle} alt="icon" onClick={() => {setPrice((pre) => Number(pre) + 1)}}/>
                  </div>
                  <div className="input-range">
                    <div>
                      <span>64</span>
                      <p>thanks coins generated</p>
                    </div>
                    <input
                      type="range"
                      value={price}
                      min={tab.min}
                      max={tab.max}
                      step="10"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </>
              )
          )}
        </CardBody>
      </div>
      <SubmitButton>
        <button onClick={() => savePlan()}>Select</button>
      </SubmitButton>
    </SubscibeWrapper>
  );
}

export default Subscribe;

const SubscibeWrapper = styled.div`
  height: 100vh;
  margin-left: 15px;
`;
const HeadingSection = styled.div`
  margin-bottom: 44px;
  h2 {
    font-weight: 400;
    font-size: 32px;
    line-height: 44.8px;
    margin-bottom: 45px;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
  }
`;
const CardHeader = styled.div`
  display: flex;
  button {
    min-width: 200px;
    background: #d9d9d9;
    color: #434289;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-transform: capitalize;
    border-radius: 24px 24px 0px 0px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  button span {
    display: block;
    color: #434289 !important;
    pointer-events: none;
  }
  button span:not(:first-child) {
    opacity: 0.6;
  }
  button.active {
    background: #434289;
  }
  button.active span {
    color: white !important;
  }
`;
const CardBody = styled.div`
  width: 460px;
  background-color: #f5f5f5;
  padding: 60px 53px;
  box-sizing: border-box;
  h6 {
    margin: 0;
    font-weight: 400;
    font-size: 30px;
    line-height: 42px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 19.5px;
    text-align: center;
    margin-top: 10px;
  }
  div {
    background: transparent;
    margin: 0px;
  }
  .input-wrapper {
    display: flex;
    margin-top: 60px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    img {
      cursor: pointer;
    }
    > div {
      width: 90%;
      position: relative;

      p {
        position: absolute;
        right: 10px;
        bottom: 0;
        top: 0;
        margin: 0;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
      }
      span {
        position: absolute;
        left: 8px;
        top: 10px;
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }
    }
    input {
      height: 50px;
      font-size: 28px;
      outline: none;
      border: 1px solid #d9d9d9;
      color: #434289;
      width: 100%;
      padding-left: 20px;
      padding-right: 80px;
      box-sizing: border-box;
    }
  }
  .input-range {
    > div {
      display: flex;
      margin: 10px 0;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: 700;
        line-height: 19.5px;
      }
      p {
        margin: 0 0 0 5px;
        font-size: 13px;
        font-weight: 500;
      }
    }
    input {
      cursor: pointer;
      width: 90%;
      accent-color: rgb(67, 66, 137);
      color: rgb(67, 66, 137) !important;
      &:focus {
        accent-color: rgb(67, 66, 137);
        color: rgb(67, 66, 137) !important;
      }
      &:hover {
        accent-color: rgb(67, 66, 137);
        color: rgb(67, 66, 137) !important;
      }
      &:focus-visible {
        outline: none;
      }
    }
    input::-webkit-slider-thumb {
      transform: scale(1.5);
    }
  }
`;

const SubmitButton = styled.div`
  width: 460px;
  margin: 40px 0 0;
  text-align: center;
  button {
    box-shadow: 0px 4px 4px 0px #00000040;
    min-width: 146px;
    padding: 11px 35px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 500;
  }
`;
