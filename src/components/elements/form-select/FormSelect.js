import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Select, {components} from "react-select";
import caretDown from "../../../assets/images/caret-down.png";
import Text from "../../text";
import {Col, Row} from "react-grid-system";

const StyledFormSelect = styled.div`
  width: 100%;
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

    control: (base, state, error) => ({
        ...base,
        background: "#fff",
        borderColor: "#E8E8E8",
        borderRadius: '5px',
        outline: "none",
        boxShadow: "none",
        color: "#7E7E7E",
        display: "flex",
        overflow: 'hidden',
        padding: '0px 10px',
        width: '100%',
        minHeight: '40px',
        fontSize: '16px',
        fontWeight: '300',
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

const FormSelect = ({
                        options = [],
                        setValue,
                        label,
                        name,
                        placeholder,
                        validation,
                        error,
                        defaultValue = '',
                        disabled = false,
                        Controller,
                        control,
                        rule = {},
                        onChange = (value) => {
                            console.log(value)
                        },
                        isMulti = false,
                        isDisabled = false, ...props
                    }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    useEffect(() => {
        setValue(name, defaultValue)
    }, [defaultValue])
    const handleChange = (value) => {
        setSelectedValue(value.value);
        setValue(name, isMulti ? [...value.map(item => item.value)] : value.value);
        onChange(value);

    }

    return (
        <Row>
            <Col xs={12}>
                <StyledFormSelect {...props}>
                    <Controller
                        control={control}
                        name={name}
                        rules={rule}
                        render={() => (
                            <Select
                                clearIndicator={true}
                                options={options}
                                disabled={disabled}
                                placeholder={placeholder}
                                onChange={handleChange}
                                styles={customStyles}
                                components={{DropdownIndicator}}
                                isMulti={isMulti}
                                isDisabled={isDisabled}
                                value={
                                    isMulti ? selectedValue : options.filter(option =>
                                        option.value === selectedValue)
                                }
                            />
                        )}
                    />

                </StyledFormSelect>
            </Col>
            <Col xs={12}>
                <Text xs danger>{error && error.type == 'required' && `${label} майдон тўлдирилиши шарт`}</Text>
                <Text xs danger>{error && error.type == 'pattern' && `${label} яроқли эмас`}</Text>
                <Text xs danger>{error && error.type == 'validation' && `${error.message} `}</Text>
            </Col>

        </Row>
    );
};

export default FormSelect;
