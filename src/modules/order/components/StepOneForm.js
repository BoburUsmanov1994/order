import React from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {useForm} from "react-hook-form";
import Title from "../../../components/title";
import StepNav from "../../../components/step-nav";
import Button from "../../../components/button";
import Label from "../../../components/elements/label";
import Input from "../../../components/elements/input";
import Calendar from "../../../components/elements/calendar";
import FormSelect from "../../../components/elements/form-select";


const StyledStepOneForm = styled.form`
`;
const StepOneForm = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <StyledStepOneForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>1. Жабрланувчининг шахсий маълумотларини киритиш</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>Пасспорт маълумотлари</Label>
                    <Input defaultValue={'00100008'}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>ЖШИИР</Label>
                    <Input defaultValue={'12345678915'}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Исми</Label>
                    <Input defaultValue={'Исмигул'}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Фамилияси</Label>
                    <Input defaultValue={'Палончиева'}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Отасининг исми</Label>
                    <Input defaultValue={''}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Туғилган санаси</Label>
                    <Calendar />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Жинси</Label>
                    <FormSelect />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Фуқаролиги</Label>
                    <FormSelect options={[{value:'Uzbekistan',label:'Ўзбекистон фуқароси'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Ëши</Label>
                    <Input defaultValue={24}/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Миллати</Label>
                    <FormSelect options={[{value:'uzbek',label:'Ўзбек'}]} />
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} onClick={() => props.firstStep()} danger outlined>Қайта киритиш</Button>
                    <Button className={'mr-16'} onClick={() => props.previousStep()} outlined>Ортга</Button>
                    <Button className={'mr-16'} outlined>Маълумотларни сақлаш</Button>
                    <Button onClick={() => props.nextStep()} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepOneForm>
    );
};

export default StepOneForm;
