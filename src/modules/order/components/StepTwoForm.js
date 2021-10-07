import React from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import { useForm } from "react-hook-form";
import Title from "../../../components/title";
import StepNav from "../../../components/step-nav";
import Button from "../../../components/button";
import Label from "../../../components/elements/label";
import FormSelect from "../../../components/elements/form-select";
import Input from "../../../components/elements/input";


const StyledStepTwoForm = styled.form`
`;
const StepTwoForm = (props) => {
    console.log(props)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <StyledStepTwoForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>2. Жабрланувчининг ижтимоий аҳволи ҳақида маълумот</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>Маълумоти</Label>
                    <FormSelect options={[{value:'Олий',label:'Олий'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Оилавий аҳволи</Label>
                    <FormSelect options={[{value:'Оилали',label:'Оилали'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Ижтимоий аҳволи</Label>
                    <FormSelect options={[{value:'Тиланчи',label:'Тиланчи'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Шахснинг бандлиги</Label>
                    <FormSelect options={[{value:'Ишсиз',label:'Ишсиз'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Шахснинг ҳолати бўйича</Label>
                    <Input defaultValue={'Руҳий носоғлом'}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Содир этилган жойи  </Label>
                    <FormSelect options={[{value:'Иш жойи',label:'Иш жойи'}]} />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button className={'mr-16'} onClick={() => props.firstStep()} danger outlined>Қайта киритиш</Button>
                    <Button className={'mr-16'} onClick={() => props.previousStep()} outlined>Ортга</Button>
                    <Button className={'mr-16'} outlined>Маълумотларни сақлаш</Button>
                    <Button onClick={() => props.nextStep()} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepTwoForm>
    );
};

export default StepTwoForm;
