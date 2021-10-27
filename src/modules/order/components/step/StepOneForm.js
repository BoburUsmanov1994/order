import React,{useState,useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import {get} from "lodash";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import Calendar from "../../../../components/elements/calendar";
import FormSelect from "../../../../components/elements/form-select";
import moment from "moment";


const StyledStepOneForm = styled.form`
`;
const StepOneForm = ({victim = {},genders,citizenship,ages,saveToLocalStorage = () => {},reset = () => {},...props}) => {
    const [dateofbirthday,setDateOfBirthday] = useState(get(victim,'dateofbirthday',moment()))
    const {register, handleSubmit, formState: {errors},setValue,control} = useForm();

    useEffect(() => {
        reinitilize();
    },[victim])
    const onSubmit = (data) => {
        saveToLocalStorage({...data,dateofbirthday});
        props.nextStep();
    }

    const firstStep = () => {
        reset({firstStep:props.firstStep})
    }

    const reinitilize = () => {
        setValue('passportinfo',get(victim,'passportinfo'));
        setValue('identitynumber',get(victim,'identitynumber'));
        setValue('name',get(victim,'name'));
        setValue('secondname',get(victim,'secondname'));
        setValue('middlename',get(victim,'middlename'));
        setValue('genderId',get(victim,'genderId'));
        setValue('citizenshipId',get(victim,'citizenshipId'));
        setValue('agesId',get(victim,'agesId'));
        setValue('nationality',get(victim,'nationality'));
    }
    return (
        <StyledStepOneForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>1. Жабрланувчининг шахсий маълумотларини киритиш</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>Пасспорт маълумотлари</Label>
                    <Input  register={register} label={'Пасспорт маълумотлари'} name={'passportinfo'} validation={{required: true}}
                           error={errors?.passportinfo} defaultValue={get(victim,'passportinfo')} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>ЖШИИР</Label>
                    <Input register={register} label={'ЖШИИР'} name={'identitynumber'} validation={{required: true}}
                           error={errors?.identitynumber} type={'number'} defaultValue={get(victim,'identitynumber')} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Исми</Label>
                    <Input register={register} label={'Исми'} name={'name'} validation={{required: true}} defaultValue={get(victim,'name')} error={errors?.name} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Фамилияси</Label>
                    <Input register={register} label={'Фамилияси'} name={'secondname'} validation={{required: true}} defaultValue={get(victim,'secondname')} error={errors?.secondname} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Отасининг исми</Label>
                    <Input register={register} label={'Отасининг исми'} name={'middlename'} defaultValue={get(victim,'middlename')} validation={{required: true}} error={errors?.middlename}  sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Туғилган санаси</Label>
                    <Calendar defaultValue={moment(dateofbirthday).toDate()} onChange={(val) => setDateOfBirthday(val)} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Жинси</Label>
                    <FormSelect defaultValue={get(victim,'genderId')} options={genders}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'genderId'}
                                label={'Жинси'} placeholder={'Жинсини танланг'} error={errors?.genderId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Фуқаролиги</Label>
                    <FormSelect defaultValue={get(victim,'citizenshipId')} options={citizenship}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'citizenshipId'}
                                label={'Фуқаролиги'} placeholder={'Фуқаролиги'} error={errors?.citizenshipId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Ëши</Label>
                    <FormSelect defaultValue={get(victim,'agesId')} options={ages}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'agesId'}
                                label={'Ëши'} placeholder={'Ëши'} error={errors?.agesId} />

                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Миллати</Label>
                    <Input defaultValue={get(victim,'nationality')} register={register} label={'Миллати'} name={'nationality'} validation={{required: true}}   error={errors?.nationality} sm/>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>Қайта киритиш</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()} outlined>Ортга</Button>
                    <Button type={'submit'} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepOneForm>
    );
};

export default StepOneForm;
