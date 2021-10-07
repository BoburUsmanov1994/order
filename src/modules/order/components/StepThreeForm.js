import React from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import { useForm } from "react-hook-form";
import Title from "../../../components/title";
import StepNav from "../../../components/step-nav";
import Button from "../../../components/button";
import Label from "../../../components/elements/label";
import FormSelect from "../../../components/elements/form-select";


const StyledStepThreeForm = styled.form`
`;
const StepThreeForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <StyledStepThreeForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>3. Жабрланувчининг яшаш манзили ҳақида маълумотлар</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>Айни вақтда яшаш Вилояти</Label>
                    <FormSelect options={[{value:'Тошкент шаҳри',label:'Тошкент шаҳри'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Айни вақтда яшаш тумани</Label>
                    <FormSelect options={[{value:'Чилонзор',label:'Чилонзор'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Айни вақтда яшаш маҳалла</Label>
                    <FormSelect options={[{value:'Навниҳол МФЙ',label:'Навниҳол МФЙ'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Айни вақтда яшаш манзили</Label>
                    <FormSelect options={[{value:'Чилонзор 2',label:'Чилонзор 2'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган Вилояти </Label>
                    <FormSelect options={[{value:'Тошкент шаҳри',label:'Тошкент шаҳри'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган тумани </Label>
                    <FormSelect options={[{value:'Чилонзор',label:'Чилонзор'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган маҳалла</Label>
                    <FormSelect options={[{value:'Навниҳол МФЙ',label:'Навниҳол МФЙ'}]} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Доимий рўйҳатдан ўтган манзили </Label>
                    <FormSelect options={[{value:'Чилонзор 2',label:'Чилонзор 2'}]} />
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
        </StyledStepThreeForm>
    );
};

export default StepThreeForm;
