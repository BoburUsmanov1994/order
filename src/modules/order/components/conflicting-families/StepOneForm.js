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


const StyledStepOneForm = styled.form`
`;
const StepOneForm = ({
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
        setValue('davname', get(family, 'davname'));
        setValue('davsecondname', get(family, 'davsecondname'));
        setValue('davmiddelname', get(family, 'davmiddelname'));
        setValue('davregId', get(family, 'davregId'));
        setValue('davdistrictId', get(family, 'davdistrictId'));
        setValue('davmfyId', get(family, 'davmfyId'));
        setValue('davaddress', get(family, 'davaddress'));
    }
    return (
        <StyledStepOneForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.current} /></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>1. ?????????????????????? ???????????? ???????????????????????????? ??????????????</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={4} className={'mb-32'}>
                    <Label>????????</Label>
                    <Input register={register} label={'????????'} name={'davname'} validation={{required: true}}
                           defaultValue={get(family, 'davname')} error={errors?.davname} sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>??????????????????</Label>
                    <Input register={register} label={'??????????????????'} name={'davsecondname'} validation={{required: true}}
                           defaultValue={get(family, 'davsecondname')} error={errors?.davsecondname} sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>?????????????????? ????????</Label>
                    <Input register={register} label={'?????????????????? ????????'} name={'davmiddelname'}
                           defaultValue={get(family, 'davmiddelname')} validation={{required: true}}
                           error={errors?.davmiddelname} sm/>
                </Col>

                <Col xs={4} className={'mb-32'}>
                    <Label>????????????</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)}
                                defaultValue={get(family, 'davregId')} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'davregId'}
                                label={'????????????'} placeholder={'????????????'}
                                error={errors?.davregId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>??????????</Label>
                    <FormSelect onChange={({value}) => getNeighborhoodsByDistrict(value)}
                                defaultValue={get(family, 'davdistrictId')} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'davdistrictId'}
                                label={'??????????'} placeholder={'??????????'}
                                error={errors?.davdistrictId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>??????????????</Label>
                    <FormSelect defaultValue={get(family, 'davmfyId')} options={neighborhoods}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'davmfyId'}
                                label={'??????????????'} placeholder={'??????????????'}
                                error={errors?.davmfyId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>????????????</Label>
                    <Input defaultValue={get(family, 'davaddress')} register={register} label={'??????????????'}
                           name={'davaddress'}  error={errors?.davaddress} sm/>
                </Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>??????????
                        ??????????????</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()}
                            outlined>??????????</Button>
                    <Button type={'submit'} success>??????????????</Button>
                </Col>
            </Row>
        </StyledStepOneForm>
    );
};

export default StepOneForm;
