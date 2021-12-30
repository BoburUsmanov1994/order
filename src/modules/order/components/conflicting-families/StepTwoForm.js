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


const StyledStepTwoForm = styled.form`
`;
const StepTwoForm = ({
                         family = {},
                         getDistrictsByRegion = () => {},
                         getNeighborhoodsByDistrict = () => {},
                         regions = [],
                         districts = [],
                         neighborhoods = [],
                         saveToLocalStorage = () => {},
                         reset = () => {},
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
        setValue('javname', get(family, 'javname'));
        setValue('javsecondname', get(family, 'javsecondname'));
        setValue('javmiddelname', get(family, 'javmiddelname'));
        setValue('javregId', get(family, 'javregId'));
        setValue('javdistrictId', get(family, 'javdistrictId'));
        setValue('javmfyId', get(family, 'javmfyId'));
        setValue('javaddress', get(family, 'javaddress'));
    }
    return (
        <StyledStepTwoForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>2. Жавобгарнинг шахсий маълумотларини киритиш</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={4} className={'mb-32'}>
                    <Label>Исми</Label>
                    <Input register={register} label={'Исми'} name={'javname'} validation={{required: true}}
                           defaultValue={get(family, 'javname')} error={errors?.javname} sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Фамилияси</Label>
                    <Input register={register} label={'Фамилияси'} name={'javsecondname'} validation={{required: true}}
                           defaultValue={get(family, 'javsecondname')} error={errors?.javsecondname} sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Отасининг исми</Label>
                    <Input register={register} label={'Отасининг исми'} name={'javmiddelname'}
                           defaultValue={get(family, 'javmiddelname')} validation={{required: true}}
                           error={errors?.davmiddelname} sm/>
                </Col>

                <Col xs={4} className={'mb-32'}>
                    <Label>Вилоят</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)}
                                defaultValue={get(family, 'javregId')} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'javregId'}
                                label={'Вилоят'} placeholder={'Вилоят'}
                                error={errors?.javregId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Туман</Label>
                    <FormSelect onChange={({value}) => getNeighborhoodsByDistrict(value)}
                                defaultValue={get(family, 'javdistrictId')} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'javdistrictId'}
                                label={'Туман'} placeholder={'Туман'}
                                error={errors?.javdistrictId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Маҳалла</Label>
                    <FormSelect defaultValue={get(family, 'javmfyId')} options={neighborhoods}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'javmfyId'}
                                label={'Маҳалла'} placeholder={'Маҳалла'}
                                error={errors?.javmfyId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Манзил</Label>
                    <Input defaultValue={get(family, 'javaddress')} register={register} label={'Миллати'}
                           name={'javaddress'}  error={errors?.javaddress} sm/>
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
        </StyledStepTwoForm>
    );
};

export default StepTwoForm;
