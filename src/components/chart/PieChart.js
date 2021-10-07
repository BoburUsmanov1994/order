import React from 'react';
import styled from "styled-components";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {Col, Row} from "react-grid-system";
import exportImg from "../../assets/images/icons/export.png";
import Dot from "../dot";

const StyledCustomPieChart = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  padding: 25px 15px;
  border-radius: 10px;
  width: 70%;
  margin-bottom: 30px;

  .recharts-default-tooltip {
    //background-color: #322A7D !important;
    //color: #fff !important;
  }

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
const CustomPieChart = ({name,id,...props}) => {
    const COLORS = ['#FF8E00', '#E3111A', '#2BCC71', '#5453CD']
    const data = [
        {name: 'Ўрта', value: 1400},
        {name: 'Маълумоти йўқ', value: 1567},
        {name: 'Ўрта махсус ', value: 1398},
        {name: 'Олий', value: 900},
    ];
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
                    <Col xs={6}>
                        <Dot title={'Ўрта махсус '} percent={'85.7'} success />
                    </Col>
                    <Col xs={6}>
                        <Dot title={'Маълумоти йўқ'} percent={'14.9'} danger />
                    </Col>
                    <Col xs={6}>
                        <Dot title={'Олий'} percent={'9'} primary />
                    </Col>
                    <Col xs={6}>
                        <Dot title={'Ўрта'} percent={'11.9'} warning />
                    </Col>
                </Row>
            </div>
        </StyledCustomPieChart>
    );
};

export default CustomPieChart;
