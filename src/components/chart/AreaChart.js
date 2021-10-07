import React from 'react';
import styled from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StyledCustomAreaChart = styled.div`
height: ${({height}) => height ? height+'px' : '400px'};
`;

const data = [
    {
        name: '1 Январ',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '1 Феврал',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '1 Март',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '1 Апрел',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '1 Май',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '1 Июнь',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '1 Июль',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const CustomAreaChart = ({type='',...props}) => {
    return (
        <StyledCustomAreaChart {...props}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type={type} dataKey="uv" stackId="1" stroke="#ED9D05" fill="rgba(237,157,5,0.1)" />
                    <Area type={type} dataKey="pv" stackId="1" stroke="#0D5EE0" fill="rgba(13,94,224,0.1)" />
                    <Area type={type} dataKey="amt" stackId="1" stroke="#EA0909" fill="rgba(234,9,9,0.1)" />
                </AreaChart>
            </ResponsiveContainer>
        </StyledCustomAreaChart>
    );
};

export default CustomAreaChart;
