import React from 'react';
import styled from "styled-components";
import Pagination from "../pagination";


const StyledTable = styled.div`
  border-radius: 15px;
  border: 1px solid #707070;
  padding-bottom: 30px;
  margin-bottom: 15px;
  overflow-x: auto;
  table{
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
  td ,th{
    font-size: 14px;
    color: #7E7E7E;
    font-weight: 300;
    padding: 8px 10px;
    border-bottom: 1px solid #DCDCDC;
    vertical-align: middle;
    min-width: 125px;
  }
  td.w-200{
    min-width: 200px;
  }
`;
const Table = ({current=0,paginate=()=>{},totalItems=0,columns = [], children, ...props}) => {
    return (
        <>
        <StyledTable {...props}>
            <table>
            <thead>
            <tr>
                {
                    columns && columns.map((column,index)=><th key={index}>{column}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
            </table>
            {totalItems > 0 && <Pagination current={current} paginate={paginate} totalItems={totalItems}/>}
        </StyledTable>

        </>
    );
};

export default Table;
