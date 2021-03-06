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
const StepOneForm = ({victim = {},update=false,genders,citizenship,ages,saveToLocalStorage = () => {},getDataFromMvd=()=>{},mvdData={},reset = () => {},...props}) => {
    const [dateofbirthday,setDateOfBirthday] = useState(get(victim,'dateofbirthday',moment()))
    const {register, handleSubmit, formState: {errors},setValue,getValues,control} = useForm();

    useEffect(() => {
        reinitilize();
    },[victim])
    const onSubmit = (data) => {
        saveToLocalStorage({...data,dateofbirthday});
        props.nextStep();
    }
    useEffect(() =>{
        if(dateofbirthday && getValues('passportinfo')){
            getDataFromMvd(getValues('passportinfo'),dateofbirthday);
        }
    },[dateofbirthday])

    const firstStep = () => {
        reset({firstStep:props.firstStep})
    }

    useEffect(()=>{
        if(get(mvdData,'status')){
            setValue('identitynumber',get(mvdData,'inps'));
            setValue('name',get(mvdData,'name'));
            setValue('secondname',get(mvdData,'surname'));
            setValue('middlename',get(mvdData,'patronym'));
        }
    },[mvdData])

    const reinitilize = () => {
        if(update){
            setValue('passportinfo',get(victim,'citizensId.passportinfo'));
            setValue('identitynumber',get(victim,'citizensId.identitynumber'));
            setValue('name',get(victim,'citizensId.name'));
            setValue('secondname',get(victim,'citizensId.secondname'));
            setValue('middlename',get(victim,'citizensId.middlename'));
            setValue('genderId',get(victim,'citizensId.genderId'));
            setValue('citizenshipId',get(victim,'citizensId.citizenshipId'));
            setValue('agesId',get(victim,'citizensId.agesId'));
            setValue('nationality',get(victim,'citizensId.nationality'));
        }else{
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

    }
    return (
        <StyledStepOneForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>1. ?????????????????????????????? ???????????? ???????????????????????????? ??????????????</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>???????????????? ????????????????????????</Label>
                    <Input  register={register} label={'???????????????? ????????????????????????'} name={'passportinfo'} validation={{required: true}}
                           error={errors?.passportinfo} defaultValue={get(victim,'passportinfo')} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>???????????????? ????????????</Label>
                    <Calendar defaultValue={moment(dateofbirthday).toDate()} onChange={(val) => setDateOfBirthday(val)} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>??????????</Label>
                    <Input register={register} label={'??????????'} name={'identitynumber'} validation={{required: true}}
                           error={errors?.identitynumber} type={'number'} defaultValue={get(victim,'identitynumber')} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>????????</Label>
                    <Input register={register} label={'????????'} name={'name'} validation={{required: true}} defaultValue={get(victim,'name')} error={errors?.name} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>??????????????????</Label>
                    <Input register={register} label={'??????????????????'} name={'secondname'} validation={{required: true}} defaultValue={get(victim,'secondname')} error={errors?.secondname} sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>?????????????????? ????????</Label>
                    <Input register={register} label={'?????????????????? ????????'} name={'middlename'} defaultValue={get(victim,'middlename')} validation={{required: true}} error={errors?.middlename}  sm/>
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>??????????</Label>
                    <FormSelect defaultValue={get(victim,'genderId')} options={genders}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'genderId'}
                                label={'??????????'} placeholder={'?????????????? ??????????????'} error={errors?.genderId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>????????????????????</Label>
                    <FormSelect defaultValue={get(victim,'citizenshipId')} options={citizenship}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'citizenshipId'}
                                label={'????????????????????'} placeholder={'????????????????????'} error={errors?.citizenshipId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>??????</Label>
                    <FormSelect defaultValue={get(victim,'agesId')} options={ages}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'agesId'}
                                label={'??????'} placeholder={'??????'} error={errors?.agesId} />

                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>??????????????</Label>
                    <Input defaultValue={get(victim,'nationality')} register={register} label={'??????????????'} name={'nationality'} validation={{required: true}}   error={errors?.nationality} sm/>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>?????????? ??????????????</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()} outlined>??????????</Button>
                    <Button type={'submit'} success>??????????????</Button>
                </Col>
            </Row>
        </StyledStepOneForm>
    );
};

export default StepOneForm;
