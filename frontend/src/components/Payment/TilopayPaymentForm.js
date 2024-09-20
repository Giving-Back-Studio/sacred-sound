import React, { useEffect, useRef, useState } from "react";
import CVV from "../../assets/CVV.svg";
import styled from "styled-components";

function formatString(inputString) {
    const regex = /(.{4})/g;
    const formattedString = inputString.replace(regex, '$1 ').trim();
    return formattedString;
}

export default function TilopayPaymentForm({ selectedCard }) {
    const nameOnCard = useRef()
    const cardDetails = useRef({})
  useEffect(() => {
    function fetchCard(cardId) {
      if (cardId) {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getCard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _id: selectedCard.cardId,
            userId: '65e073195bdcf11766875821',
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setFormData({ card: formatString(data.card.card), expire: data.card.expire});
            nameOnCard.current.value = data.card.nameOnCard
          });
      }
    }
    if(selectedCard.index === -1){
        nameOnCard.current.value = ''
    }
    fetchCard(selectedCard.cardId);
  }, [selectedCard]);

  const queryParams = new URLSearchParams(window.location.search);
  const amount = queryParams.get("amount");
  const [paymentMethods, setMethods] = useState([]);
  const [formData, setFormData] = useState({
    card: "",
    expire: "",
    cvv: "",
    nameOnCard: "",
    userId: "65e073195bdcf11766875821",
  });
  const tilopay = useRef(null);
  const exicuteScript = async () => {
    const tilopayObj = window.Tilopay;
    tilopay.current = tilopayObj;
    if (tilopayObj) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getTilopayToken`)
        .then((res) => res.json())
        .then(async (data) => {
          let initialize = await tilopayObj.Init({
            token: data.token,
            currency: "USD",
            language: "en",
            amount: amount,
            orderNumber: (Math.random() * 1000).toFixed(0),
            billToFirstName: "firstName",
            billToLastName: "lastName",
            billToAddress: "San Jose",
            billToAddress2: "sdfd",
            billToCity: "adf",
            billToState: "sfsfd",
            billToEmail: "namne@gmail.com",
            billToZipPostCode: "353545",
            billToCountry: "CR",
            billToTelephone: "42343242344",
            subscription: 1,
            capture: 0,
            redirect: "http://localhost:3000/myAccount/checkout-result",
            returnData: amount,
          });
          console.log(initialize);
          setMethods(initialize.methods);
        });
    } else {
      console.error("Function not available");
    }
  };
  useEffect(() => {
    exicuteScript();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(formData,cardDetails.current.value)
    const payment = await tilopay.current.startPayment();
    console.log(payment);
  };
  return (
    <PaymentDetails>
      <h2>Payment details</h2>

      <div className="payFormTilopay form-wrapper">
        <select
          name="tlpy_payment_method"
          id="tlpy_payment_method"
          style={{ display: "none" }}
        >
          {paymentMethods.map((method) => (
            <option value={method.id} key={method.id}>
              {method.name}
            </option>
          ))}
        </select>

        <div className="form-group">
          <label className="label">Card number</label>
          <input
            type="text"
            readOnly={selectedCard.index === -1 ? false : true}
            id="tlpy_cc_number"
            name="tlpy_cc_number"
            ref={cardDetails}
            value={selectedCard.index === -1 ? '': formData.card}
            placeholder="1234 1234 1234 1234"
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
            ref={nameOnCard}
            readOnly={selectedCard.index === -1 ? false : true}
            // value={selectedCard.index === -1 ? '': formData.nameOnCard}
            // onChange={(event) => {
              
            // }}
          />
        </div>
        <div className="flex-col">
          <div className="form-group">
            <label>Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              readOnly={selectedCard.index === -1 ? false : true}
              value={selectedCard.index === -1 ? '': formData.expire}
              id="tlpy_cc_expiration_date"
              name="tlpy_cc_expiration_date"
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
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              placeholder="cvv"
              id="tlpy_cvv"
              name="tlpy_cvv"
              value={''}
              onChange={(event) => {
                setFormData({ ...formData, cvv: event.target.value });
              }}
            />
            <img src={CVV} alt="icon" />
          </div>
        </div>
      </div>
      <div id="responseTilopay"></div>
      <button to="" className="PlanCta" onClick={onSubmit} type="submit">
        Complete Purchase
      </button>
    </PaymentDetails>
  );
}

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
      width: 100%;
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
        width: 100%;
        box-sizing: border-box;
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
