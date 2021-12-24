import React, {useState} from 'react';
import styled,{css} from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarImg from "../../../assets/images/calendar.png";

const StyledCalendar = styled.div`
  width: 100%;
  min-width: 250px;
  height: 53px;
  border: 1px solid #E8E8E8;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;

  img {
    padding: 18px 22px;
    border-right: 1px solid #E8E8E8;
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
  ${({sm}) => sm && css`
    height:40px;
    img{
      padding: 10px 22px;
    }
  `}
`;
const Calendar = ({
                      error,
                      defaultValue = new Date(),
                      disabled = false,
                      dateFormat="dd/MM/yyyy",
                      onChange = (value) => { console.log(value)},
                       ...props
                  }) => {
    const [startDate, setStartDate] = useState(defaultValue);
    const handleChange = (date) => {
        setStartDate(date);
        onChange(date);
    }
    return (
        <StyledCalendar {...props}>
            <img src={calendarImg} alt=""/>
            <DatePicker showYearDropdown dateFormat={dateFormat} className={'datepicker'} selected={startDate} onChange={handleChange}/>
        </StyledCalendar>
    );
};

export default Calendar;
