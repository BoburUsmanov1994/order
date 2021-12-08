import React from 'react';
import styled from "styled-components";
import {get,isEqual} from "lodash";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {Col, Row} from "react-grid-system";
import exportImg from "../../assets/images/icons/export.png";
import Dot from "../dot";

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
    }

    &__bottom {

    }
  }
`;
const CustomPieChart = ({name,data,...props}) => {
    const COLORS = ['#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412','#2BCC71', '#E94C3D', '#5A51DE', '#E99412']

    return (
        <StyledCustomPieChart {...props}>
            <div className="chart__head">
                <span>{name}</span>
                <img src={exportImg} alt=""/>
            </div>
            <div className="chart__center">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart height={250}>
                        <Pie
                            data={data}
                            innerRadius={80}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                            ))}
                        </Pie>
                        <Tooltip className={'tooltip'}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="chart__bottom">
                <Row>
                    {
                        data && data.map((item,index) => <Col className={'mb-24'} key={index} xs={6}>
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
