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
const Table = (props) => {
    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'seria', name: 'Ҳимоя ордер серияси' },
        { key: 'region', name: 'Вилоят' },
        { key: 'district', name: 'Туман' },
        { key: 'neighborhood', name: 'Маҳалла' },
        { key: 'place', name: 'Содир этилган жой ' },
        { key: 'date', name: 'Ордер берилган вақти ' },
        { key: 'action', name: 'Шахсни кўшиш' },
        { key: 'status', name: 'Ҳолати' }
    ];

    const rows = [
        { id: 1, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 2, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 3, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 4, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 5, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 6, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 7, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 8, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
        { id: 9, seria: '00100001',region:'Навоий',district:'Кармана',neighborhood: 'А.Навоий МФЙ',place:'61 уй',date:'13.09.2021-14:12',action:'action',status:'Янги'},
    ];
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

export default Table;
