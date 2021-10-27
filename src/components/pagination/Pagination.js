import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import {ceil} from "lodash";
import paginationPrev from "../../assets/images/paginationPrev.png";
import paginationNext from "../../assets/images/paginationNext.png";
import go from "../../assets/images/go.png";

const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 30px;

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        width: 44px;
        display: inline-flex;
        height: 44px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        font-size: 18px;
        color: #7E84A3;
        font-weight: 300;
      }

      &.active {
        a {
          color: #fff;
          background-color: #7E84A3;
        }
      }
    }
  }

  .go {
    margin-left: 22px;
    margin-right: 30px;

    &__text {
      color: #7E84A3;
      font-size: 10px;
      margin-bottom: 5px;
    }

    &__input {
      border-radius: 5px;
      border: 1px solid #7E84A3;
      padding: 2px 8px;
      height: 30px;
      width: 125px;
      display: flex;
      align-items: center;

      input {
        width: 100%;
        height: 20px;
        outline: none;
        border: none;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      button {
        cursor: pointer;
        border: none;
        outline: none;
        background-color: transparent;
      }
    }
  }
`;
const Pagination = ({totalItems=0,current=0,paginate=(page)=>console.log(page),...props}) => {

    return (
        <StyledPagination {...props}>
            <ReactPaginate
                previousLabel={<img src={paginationPrev}/>}
                nextLabel={<img src={paginationNext}/>}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={ceil(totalItems/20)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={paginate}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={current}
            />
            {/*<div className={'go'}>*/}
            {/*    <p className={'go__text'}>Саҳифага утиш</p>*/}
            {/*    <div className={'go__input'}>*/}
            {/*        <input type="number"/>*/}
            {/*        <button>*/}
            {/*            <img src={go} alt=""/>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </StyledPagination>
    );
};

export default Pagination;
