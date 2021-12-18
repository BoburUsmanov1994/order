import React, {useEffect} from 'react';
import styled from "styled-components";
import {get,isEqual,round} from "lodash";
import {Col, Row} from "react-grid-system";
import exportImg from "../../assets/images/icons/export.png";
import { PieChart } from 'react-minimal-pie-chart';
import {PDFDownloadLink} from '@react-pdf/renderer';
import Dot from "../dot";
import PdfReport from "../pdf";
import Text from "../text";

const StyledCustomPieChart = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  padding: 25px 15px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 30px;

  
  .chart {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 15px;
      border-bottom: 1px solid #E2E2E2;

      span {
        color: #808080;
        font-weight: 500;
      }

      img {
        cursor: pointer;
      }
    }

    &__center {
      padding-top: 20px;
      padding-bottom: 15px;
      height: 250px;
    }

    &__bottom {

    }
  }
`;
const CustomPieChart = ({name,data,filter,title='Республика',...props}) => {
    const COLORS = ['#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412']
    const chartData = data.filter(({percent}) => percent > 0).map(({name,percent},index) => ({title:name,value:round(percent,2),color:COLORS[index]}));
    const listData = data.filter(({value}) => value > 0).map(({name,value},index) => ({name:name,value:round(value,2)}));


    return (
        <StyledCustomPieChart {...props}>
            <div className="chart__head">
                <span>{name}</span>
                {chartData && listData && <PDFDownloadLink document={<PdfReport from={get(filter,'from')} to={get(filter,'to')} title={`${name} (${title ?? null})`} items={data.map(({name,percent,value},index) => ({name,count:value,percent:round(percent,2)}))} />}  fileName={`${name}.pdf`}>
                    {({blob, url, loading, error}) => <img src={exportImg} alt=""/>}
                </PDFDownloadLink>}

            </div>
            <div className="chart__center">
                <PieChart
                    lineWidth={80} paddingAngle={5}
                    label={({ dataEntry }) => dataEntry.value+'%'}
                    labelStyle={{
                        fontSize: '6px',
                        fontFamily: 'sans-serif',
                        fill:'#fff'
                    }}
                    data={chartData}
                />;

            </div>
            <div className="chart__bottom">
                <Row>
                    {
                        listData && listData.map((item,index) => <Col className={'mb-24'} key={index} xs={6}>
                            {
                                isEqual(index % 4,0) && <Dot title={get(item, 'name')} percent={get(item, 'value')} success/>
                            }
                            {
                                isEqual(index % 4,1) && <Dot title={get(item, 'name')} percent={get(item, 'value')} danger/>
                            }
                            {
                                isEqual(index % 4,2) && <Dot title={get(item, 'name')} percent={get(item, 'value')} primary/>
                            }
                            {
                                isEqual(index % 4,3) && <Dot title={get(item, 'name')} percent={get(item, 'value')} warning/>
                            }
                        </Col>)
                    }

                </Row>
            </div>
        </StyledCustomPieChart>
    );
};

export default CustomPieChart;
