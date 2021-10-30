import React,{useState} from 'react';
import styled,{css} from "styled-components";
import {DateRangePicker} from 'react-date-range';
import moment from "moment";
import {get} from "lodash";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import calendarImg from "../../assets/images/icons/calendar.png";
import calendarDownImg from "../../assets/images/icons/calendar-down.png";

const StyledRangeCalendar = styled.div`
 

  .calendar {
    position: relative;

    &__input {
      padding: 5px 10px;
      border: 1px solid #707070;
      border-radius: 20px;
      min-width: 180px;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;

      span {
        font-size: 11px;
        color: #7E7E7E;
        display: block;
        text-align: center;
        
      }
    }

    &__range {
      position: absolute;
      right: -10px;
      top: 50px;
      border:1px solid #BFB7B7;
      padding: 20px;
      border-radius: 50px;
      background-color: #fff;
      z-index: 99;
    }
  }
  ${({lg}) => lg && css`
    margin-right: 15px;
    margin-top: -5px;
  .calendar{
    &__input{
      height: 48px;
      width: 225px;
      border-radius: 60px;
      border:1px solid #BFB7B7;
      span{
        font-size: 13px;
      }
    }
    &__range{
      border-radius: 60px;
    }
  }
  `}
`;
const RangeCalendar = ({handleCalendar = () => {},...props}) => {
    const [show,setShow] = useState(false);
    const [selectionRange,setSelectionRange] = useState({
        startDate: moment().subtract(3, 'months').toDate(),
        endDate: new Date(),
        key: 'selection',
    })

    const handleSelect = ({selection}) => {
        setSelectionRange(selection);
        handleCalendar(selection);
    }
    return (
        <StyledRangeCalendar {...props}>
            <div className="calendar">
                <div className="calendar__input" onClick={() => setShow(show => !show)}>
                    <img src={calendarImg} alt=""/>
                    <span>{`${moment(get(selectionRange,'startDate')).format("DD/MM/YYYY")} - ${moment(get(selectionRange,'endDate')).format("DD/MM/YYYY")}`}</span>
                    <img src={calendarDownImg} alt=""/>
                </div>
                {show && <DateRangePicker className="calendar__range"
                                 direction="horizontal"
                                 ranges={[selectionRange]}
                                 onChange={handleSelect}
                                 showSelectionPreview={true}
                                 moveRangeOnFirstSelection={false}
                                 months={2}
                />}
            </div>
        </StyledRangeCalendar>
    );
};

export default RangeCalendar;
