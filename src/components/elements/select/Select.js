import React from 'react';
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
const BaseSelect = ({options = [],...props}) => {
     options = [
        { value: 'Navoiy', label: 'Navoiy' },
        { value: 'Buxoro', label: 'Buxoro' },
        { value: 'Samarqand', label: 'Samarqand' }
    ]
    return (
        <StyledSelect {...props}>
          <Select options={options}  styles={customStyles} />
        </StyledSelect>
    );
};

export default BaseSelect;
