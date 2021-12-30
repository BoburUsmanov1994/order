import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import {get} from "lodash";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import Input from "../../../../components/elements/input";
import FormSelect from "../../../../components/elements/form-select";


const StyledStepThreeForm = styled.form`
`;
const StepThreeForm = ({
                           family = {},
                           typeofproblems = [],
                           resultofconflicts = [],
                           saveToLocalStorage = () => {
                           },
                           reset = () => {
                           },
                           ...props
                       }) => {
    const {register, handleSubmit, formState: {errors}, setValue, getValues, control} = useForm();

    useEffect(() => {
        reinitilize();
    }, [family])
    const onSubmit = (data) => {
        saveToLocalStorage({...data});
        props.nextStep();
    }


    const firstStep = () => {
        reset({firstStep: props.firstStep})
    }


    const reinitilize = () => {
        setValue('series', get(family, 'series'));
        setValue('typeofconflect', get(family, 'typeofconflect'));
        setValue('typeofproblems', get(family, 'typeofproblems'));
        setValue('resultofconflicts', get(family, 'resultofconflicts'));
    }
    return (
        <StyledStepThreeForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>3. Зиддият сабаблари</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={4} className={'mb-32'}>
                    <Label>Серия</Label>
                    <Input register={register} label={'Серия'} name={'series'}
                           defaultValue={get(family, 'series')} error={errors?.series} sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Конфликт тури</Label>
                    <Input register={register} label={'Конфликт тури'} name={'typeofconflect'}
                           defaultValue={get(family, 'typeofconflect')} error={errors?.typeofconflect} sm/>
                </Col>


                <Col xs={4} className={'mb-32'}>
                    <Label>Иш туркуми</Label>
                    <FormSelect
                        defaultValue={get(family, 'typeofproblems')} options={typeofproblems}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'typeofproblems'}
                        label={'Иш туркуми'} placeholder={'Иш туркуми'}
                        error={errors?.typeofproblems}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Натижа</Label>
                    <FormSelect
                        defaultValue={get(family, 'resultofconflicts')} options={resultofconflicts}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'resultofconflicts'}
                        label={'Натижа'} placeholder={'Натижа'}
                        error={errors?.resultofconflicts}/>
                </Col>

            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>Қайта
                        киритиш</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()}
                            outlined>Ортга</Button>
                    <Button type={'submit'} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepThreeForm>
    );
};

export default StepThreeForm;
