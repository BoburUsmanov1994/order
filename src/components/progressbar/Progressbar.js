import React from 'react';
import styled from "styled-components";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StyledProgressbar = styled.div`

  .progress {
    &__box {
      width: 125px;
      height: 125px;
      border-radius: 50%;
      box-shadow: 0 3px 19px rgba(0, 0, 0, 0.07);
      position: relative;
      margin: 0 auto;
      margin-bottom: 15px;
    }
    &__text{
      text-align: center;
    }
  }
  margin-top: 30px;

`;
const Progressbar = ({percent = 66,text='',color='#DC3539', ...props}) => {
    return (
        <StyledProgressbar {...props}>
            <div className="progress__box">
                <CircularProgressbar strokeWidth={11} value={percent} text={`${percent}%`} styles={buildStyles({
                    textSize: '18px',
                    textColor: '#000',
                    trailColor: 'transparent',
                    pathColor: color
                })}/>
            </div>
            <p className="progress__text">
                {text}
            </p>
        </StyledProgressbar>
    );
};

export default Progressbar;
