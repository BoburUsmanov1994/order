import React, {useState} from 'react';
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarImg from "../../../assets/images/calendar.png";

const StyledCalendar = styled.div`
  width: 300px;
  height: 53px;
  border: 1px solid #707070;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;

  img {
    padding: 18px 22px;
    border-right: 1px solid #555555;
    cursor: pointer;
  }

  .datepicker {
    padding: 15px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 300;
    color: #7E7E7E;
    background-color: transparent;
    font-family: 'Ubuntu', sans-serif;
  }
`;
const Calendar = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <StyledCalendar {...props}>
            <img src={calendarImg} alt=""/>
            <DatePicker className={'datepicker'} selected={startDate} onChange={(date) => setStartDate(date)}/>
        </StyledCalendar>
    );
};

export default Calendar;
