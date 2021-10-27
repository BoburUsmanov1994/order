import React from 'react';
import styled from "styled-components";
import DataGrid from 'react-data-grid';
import Pagination from "../pagination";

const StyledTable = styled.div`
  border-radius: 15px;
  border: 1px solid #707070;
  padding-bottom: 30px;
  margin-bottom: 15px;
  .rdg{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 500px;
    &-row{
      height: 50px !important;
    }
    &-cell{
      border-right: unset;
      font-size: 16px;
      color: #7E7E7E;
      font-weight: 300;
      text-align: center;
      &[aria-selected=true]{
        box-shadow:inset 0 0 0 2px #21D59B;
      }
    }
  }
`;
const GridTable = ({columns=[],rows=[],...props}) => {
    return (
        <StyledTable {...props}>
            <DataGrid    rowSelection={'multiple'}
                         groupSelectsChildren={true}
                         suppressRowClickSelection={true}
                         suppressAggFuncInHeader={true}
                         rowHeight={50}  columns={columns} rows={rows} />
            <Pagination />
        </StyledTable>
    );
};

export default GridTable;
