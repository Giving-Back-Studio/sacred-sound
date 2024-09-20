import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Arrowleft from "../../assets/Arrowleft.svg";
import ArrowRight from "../../assets/Arrowright.svg";
import { Link } from "react-router-dom";
import BackButton from "../common/BackButton";

const options = { 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric'
};
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  function fetchOrders(userId) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/orders/${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }
  useEffect(() => {
    fetchOrders("65e073195bdcf11766875821");
  }, []);
  return (
    <OrderHistoryWrapper>
      <div style={{marginBottom: '80px'}}>
        <BackButton black={true}/>
      </div>
      
      <h1>Order history</h1>
      <TableWrapper>
        <table>
          <tr>
            <th>Date issued</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
         
          {orders?.map((order) => {
            return (
              <tr>
                <td>{new Date(order.time).toLocaleDateString('en-US', options)}</td>
                <td>{order.description}</td>
                <td>${order.amount}</td>
                <td>{order.status}</td>
                <td>
                  <Link to="">More details</Link>
                </td>
              </tr>
            );
          })}
        </table>
        <div className="OrderArrows">
          <img src={Arrowleft} alt="arrow-left" />
          <img src={ArrowRight} alt="arrow-right" />
        </div>
      </TableWrapper>
    </OrderHistoryWrapper>
  );
};

export default OrderHistory;

const OrderHistoryWrapper = styled.div`
  padding: 10px;
  height: 100vh;
  width: 100%;
  overflow:scroll;
  // height: 100%;
  > h1 {
    font-size: 32px;
    font-weight: 400;
    line-height: 44.8px;
    color: #434289;
  }
`;
const TableWrapper = styled.div`
table {
    width: 100%;
    th,
    td {
      border-bottom: 1px solid #d9d9d9;
      padding: 15px;
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      line-height: 19.9px;
      color: #434289;
      a {
        color: #434289;
      }
    }
  }
  .OrderArrows {
    margin: 76px 0 0;
    text-align: right;
    padding: 0 15px;
    img:not(:last-child) {
      margin-right: 20px;
    }
  }
`;
