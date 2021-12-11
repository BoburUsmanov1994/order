import React from 'react';
import styled from "styled-components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StyledCustomAreaChart = styled.div`
height: ${({height}) => height ? height+'px' : '400px'};
`;

const CustomAreaChart = ({data = [],type='',...props}) => {
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
                    <Area type={type} dataKey="y" stackId="1" stroke="#ED9D05" fill="rgba(237,157,5,0.1)" />
                </AreaChart>
            </ResponsiveContainer>
        </StyledCustomAreaChart>
    );
};

export default CustomAreaChart;
