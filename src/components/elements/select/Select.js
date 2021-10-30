import React,{useState} from 'react';
import Select from 'react-select';
import styled from "styled-components";

const StyledSelect = styled.div`
width: 250px;
`;

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#fff",
        borderColor: "#BFB7B7",
        borderRadius: '25px',
        outline: "none",
        boxShadow: "none",
        color: "#554B86",
        display: "flex",
        overflow: 'hidden',
        padding:'5px 10px',
        height:'48px',
        "&:hover": {
            borderColor: 'none',
            outline: "none",
        },
        "&:focus": {
            borderColor: 'none',
            outline: "none",
        }
    }),
    indicatorSeparator: (base, state) => ({
        ...base,
        display: 'none'
    })
};
const BaseSelect = ({options = [],region,defaultValue="",placeholder = 'Танлаш',handleChange = (value) => {console.log(value)},...props}) => {
    return (
        <StyledSelect {...props}>
            <Select
                clearIndicator={true}
                options={options}
                value={region}
                placeholder={placeholder}
                onChange={(value) => handleChange(value)}
                styles={customStyles}
                defaultValue={
                    options.filter(option =>
                        option.value === defaultValue)
                }
            />
        </StyledSelect>
    );
};

export default BaseSelect;
