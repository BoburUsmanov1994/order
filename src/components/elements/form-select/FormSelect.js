import React from 'react';
import styled from "styled-components";
import Select,{components } from "react-select";
import caretDown from "../../../assets/images/caret-down.png";

const StyledFormSelect = styled.div`
  width: 300px;
`;

const DropdownIndicator = props => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <img src={caretDown} alt=""/>
            </components.DropdownIndicator>
        )
    );
};
const customStyles = {
    control: (base, state) => ({
        ...base,
        background: "#fff",
        borderColor: "#707070",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#7E7E7E",
        display: "flex",
        overflow: 'hidden',
        padding:'5px 10px',
        width: '300px',
        height:'51px',
        fontSize:'18px',
        fontWeight:'300',
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

const FormSelect = ({options = [{ value: 'Ayol', label: 'Ayol' },
    { value: 'Erkak', label: 'Erkak' },], ...props}) => {


    return (
        <StyledFormSelect {...props}>
            <Select    components={{ DropdownIndicator }} options={options}   styles={customStyles} />
        </StyledFormSelect>
    );
};

export default FormSelect;
