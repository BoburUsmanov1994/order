import React, {useEffect} from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import FormSelect from "../../../../components/elements/form-select";
import {get} from "lodash";


const StyledStepTwoForm = styled.form`
`;
const StepTwoForm = ({victim = {},education = [],familyPosition = [],socialStatus=[],workingplace=[],personcondition=[],actionplace=[],saveToLocalStorage = () => {},reset = () => {},...props}) => {
    const { register, handleSubmit, watch, formState: { errors },control,setValue } = useForm();

    useEffect(() => {
        reinitilize();
    },[victim])
    const onSubmit = (data) => {
        saveToLocalStorage(data);
        props.nextStep();
    }

    const firstStep = () => {
        reset({firstStep:props.firstStep})
    }

    const reinitilize = () => {
        setValue('educationId',get(victim,'educationId'));
        setValue('familypositionId',get(victim,'familypositionId'));
        setValue('socialstatusId',get(victim,'socialstatusId'));
        setValue('workingplaceId',get(victim,'workingplaceId'));
        setValue('conditionpersonId',get(victim,'conditionpersonId'));
        setValue('placeectionId',get(victim,'placeectionId'));
    }

    return (
        <StyledStepTwoForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>2. Зўравоннинг ижтимоий аҳволи ҳақида маълумот</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={3} className={'mb-32'}>
                    <Label>Маълумоти</Label>
                    <FormSelect defaultValue={get(victim,'educationId')} options={education}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'educationId'}
                                label={'Маълумоти'} placeholder={'Маълумоти'} error={errors?.educationId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Оилавий аҳволи</Label>
                    <FormSelect defaultValue={get(victim,'familypositionId')} options={familyPosition}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'familypositionId'}
                                label={'Оилавий аҳволи'} placeholder={'Оилавий аҳволи'} error={errors?.familypositionId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Ижтимоий аҳволи</Label>
                    <FormSelect defaultValue={get(victim,'socialstatusId')} options={socialStatus}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'socialstatusId'}
                                label={'Ижтимоий аҳволи'} placeholder={'Ижтимоий аҳволи'} error={errors?.socialstatusId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Шахснинг бандлиги</Label>
                    <FormSelect defaultValue={get(victim,'workingplaceId')} options={workingplace}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'workingplaceId'}
                                label={'Шахснинг бандлиги'} placeholder={'Шахснинг бандлиги'} error={errors?.workingplaceId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Шахснинг ҳолати бўйича</Label>
                    <FormSelect defaultValue={get(victim,'conditionpersonId')} options={personcondition}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'conditionpersonId'}
                                label={'Шахснинг ҳолати бўйича'} placeholder={'Шахснинг ҳолати бўйича'} error={errors?.conditionpersonId} />
                </Col>
                <Col xs={3} className={'mb-32'}>
                    <Label>Содир этилган жойи  </Label>
                    <FormSelect defaultValue={get(victim,'placeectionId')} options={actionplace}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'placeectionId'}
                                label={'Содир этилган жойи'} placeholder={'Содир этилган жойи'} error={errors?.placeectionId} />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>Қайта киритиш</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()} outlined>Ортга</Button>
                    <Button type={'submit'} success>Кейинги</Button>
                </Col>
            </Row>
        </StyledStepTwoForm>
    );
};

export default StepTwoForm;
