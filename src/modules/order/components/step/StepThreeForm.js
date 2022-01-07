import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import FormSelect from "../../../../components/elements/form-select";
import {get} from "lodash";
import Textarea from "../../../../components/elements/textarea";


const StyledStepThreeForm = styled.form`
`;
const StepThreeForm = ({
                           victim = {},update=false, saveToLocalStorage = () => {
    }, reset = () => {
    }, getDistrictsByRegion = () => {
    }, getNeighborhoodsByDistrict = () => {
    }, regions = [], districts = [],
                           neighborhoods = [],
                           permanentdistricts = [],
                           permanentsneighborhoods = [],
                           getPermanentDistrictsByRegion = () =>{},
                           getPermanentNeighborhoodsByDistrict = () => {},
                           ...props
                       }) => {
    const {register, handleSubmit, watch, formState: {errors}, control, setValue} = useForm();
    useEffect(() => {
        reinitilize();
    }, [victim]);

    useEffect(() => {
        if (get(victim, 'regcorrentId')){
            getDistrictsByRegion(get(victim, 'regcorrentId', null));
        }
        if (get(victim, 'distcorrenId')){
            getNeighborhoodsByDistrict(get(victim, 'distcorrenId', null));
        }
        if (get(victim, 'regId')){
            getPermanentDistrictsByRegion(get(victim, 'regId', null));
        }
        if (get(victim, 'destId')){
            getPermanentNeighborhoodsByDistrict(get(victim, 'destId', null));
        }
    }, [])

    const onSubmit = (data) => {
        saveToLocalStorage(data);
        props.nextStep();
    }

    const firstStep = () => {
        reset({firstStep: props.firstStep})
    }

    const reinitilize = () => {
        setValue('regcorrentId', get(victim, 'regcorrentId'));
        setValue('distcorrenId', get(victim, 'distcorrenId'));
        setValue('mahallacorrenId', get(victim, 'mahallacorrenId'));
        setValue('currentaddress', get(victim, 'currentaddress'));
        setValue('regId', get(victim, 'regId'));
        setValue('destId', get(victim, 'destId'));
        setValue('mahallaId', get(victim, 'mahallaId'));
        setValue('permanentlyaddress', get(victim, 'permanentlyaddress'));
    }

    return (
        <StyledStepThreeForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>3. Жабрланувчининг яшаш манзили ҳақида маълумотлар</Title></Col>
            </Row>
            <Row className={'mb-32'}>
                <Col xs={4} className={'mb-32'}>
                    <Label>Айни вақтда яшаш Вилояти</Label>
                    <FormSelect onChange={({value}) => getDistrictsByRegion(value)}
                                defaultValue={get(victim, 'regcorrentId')} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regcorrentId'}
                                label={'Айни вақтда яшаш Вилояти'} placeholder={'Айни вақтда яшаш Вилояти'}
                                error={errors?.regcorrentId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Айни вақтда яшаш тумани</Label>
                    <FormSelect onChange={({value}) => getNeighborhoodsByDistrict(value)}
                                defaultValue={get(victim, 'distcorrenId')} options={districts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'distcorrenId'}
                                label={'Айни вақтда яшаш тумани'} placeholder={'Айни вақтда яшаш тумани'}
                                error={errors?.distcorrenId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Айни вақтда яшаш маҳалла</Label>
                    <FormSelect defaultValue={get(victim, 'mahallacorrenId')} options={neighborhoods}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'mahallacorrenId'}
                                label={'Айни вақтда яшаш маҳалла'} placeholder={'Айни вақтда яшаш маҳалла'}
                                error={errors?.mahallacorrenId}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Label>Айни вақтда яшаш манзили</Label>
                    <Textarea register={register} label={'Айни вақтда яшаш манзили'} name={'currentaddress'}
                              validation={{required: true}} error={errors?.currentaddress} noshadow sm/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган Вилояти </Label>
                    <FormSelect onChange={({value}) => getPermanentDistrictsByRegion(value)} defaultValue={get(victim, 'regId')} options={regions}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'regId'}
                                label={'Доимий рўйхатдан ўтган Вилояти'} placeholder={'Доимий рўйхатдан ўтган Вилояти'}
                                error={errors?.regId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган тумани </Label>
                    <FormSelect onChange={({value}) => getPermanentNeighborhoodsByDistrict(value)} defaultValue={get(victim, 'destId')} options={permanentdistricts}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'destId'}
                                label={'Доимий рўйхатдан ўтган тумани'} placeholder={'Доимий рўйхатдан ўтган тумани'}
                                error={errors?.destId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label>Доимий рўйхатдан ўтган маҳалла</Label>
                    <FormSelect defaultValue={get(victim, 'mahallaId')} options={permanentsneighborhoods}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'mahallaId'}
                                label={'Доимий рўйхатдан ўтган маҳалла'} placeholder={'Доимий рўйхатдан ўтган маҳалла'}
                                error={errors?.mahallaId}/>
                </Col>
                <Col xs={12} className={'mb-32'}>
                    <Label>Доимий рўйҳатдан ўтган манзили </Label>
                    <Textarea register={register} label={'Доимий рўйҳатдан ўтган манзили'} name={'permanentlyaddress'}
                              validation={{required: true}} error={errors?.permanentlyaddress} noshadow sm/>
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
