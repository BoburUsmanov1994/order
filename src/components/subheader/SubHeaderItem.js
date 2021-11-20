import React from 'react';
import styled,{css} from "styled-components";
import rightArrow from "../../assets/images/icons/right-arrow.svg";

const StyledSubHeaderItem = styled.div`
  
.title{
  font-size: 14px;
  font-weight: 500;
}
  h2{
    color: #322A7D;
    font-size: 46px;
    font-weight: 700;
    .count{
      font-size: 8px;
      padding: 3px 8px;
      display: inline-flex;
      align-items: center;
      color: #fff;
      border-radius: 10px;
      min-width: 30px;
      font-weight: 400;
      position: relative;
      top: -5px;
      img{
        margin-left: 5px;
      }
    }
  }
  .subtitle{
    font-size: 11px;
  }
  ${({hasBorderLeft}) => hasBorderLeft && css`
    border-left:1px solid #707070;
    padding-left: 40px;
  `}

  ${({success}) => success && css`
    h2{
      .count{
        background-color: #21D59B;
        img{
          margin-bottom: 1px;
          transform: rotate(-45deg);
        }
      }
    }
  `}

  ${({info}) => info && css`
    h2{
      .count{
        background-color: #57B8FF;
        img{
          margin-bottom: 1px;
          transform: rotate(45deg);
        }
      }
    }
  `}

  ${({warning}) => warning && css`
    h2{
      .count{
        background-color: #FFC700;
        img{
          margin-bottom: 2px;
        }
      }
    }
  `}
  @media screen and (max-width:1600px){
  h2{
    font-size: 40px;
  }
}
`;
const SubHeaderItem = ({title='',subtitle='',percent,count,hasBorderLeft=false, ...props}) => {
    return (
        <StyledSubHeaderItem hasBorderLeft={hasBorderLeft} {...props}>
            <p className="title">{title}</p>
            <h2>{count} <span className={'count'}>{percent} <img src={rightArrow} alt=""/></span></h2>
            <p className="subtitle">{subtitle}</p>
        </StyledSubHeaderItem>
    );
};

export default SubHeaderItem;
