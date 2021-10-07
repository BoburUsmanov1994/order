import React,{useState} from 'react';
import styled from "styled-components";
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import calendarImg from "../../assets/images/icons/calendar.png";
import calendarDownImg from "../../assets/images/icons/calendar-down.png";

const StyledRangeCalendar = styled.div`
  margin-left: 25px;

  .calendar {
    position: relative;

    &__input {
      padding: 5px 10px;
      border: 1px solid #707070;
      border-radius: 20px;
      width: 150px;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;

      span {
        font-size: 12px;
        color: #000;
        display: block;
        text-align: center;
      }
    }

    &__range {
      position: absolute;
      right: 0;
      top: 50px;
      border:1px solid #707070;
      padding: 20px;
      border-radius: 50px;
      background-color: #fff;
      z-index: 99;
    }
  }
`;
const RangeCalendar = (props) => {
    const [show,setShow] = useState(false);
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }
    const handleSelect = (ranges) => {
        console.log(ranges);
    }
    return (
        <StyledRangeCalendar {...props}>
            <div className="calendar">
                <div className="calendar__input" onClick={() => setShow(show => !show)}>
                    <img src={calendarImg} alt=""/>
                    <span>Ой бўйича</span>
                    <img src={calendarDownImg} alt=""/>
                </div>
                {show && <DateRangePicker className="calendar__range"
                                 direction="horizontal"
                                 ranges={[selectionRange]}
                                 onChange={handleSelect}
                                 showSelectionPreview={true}
                                 moveRangeOnFirstSelection={false}
                                 renderStaticRangeLabel={<h2>fdsfdsfds</h2>}
                                 months={2}
                />}
            </div>
        </StyledRangeCalendar>
    );
};

export default RangeCalendar;
