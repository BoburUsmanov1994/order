import React, {useEffect} from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import {get} from "lodash";
import FormSelect from "../../../../components/elements/form-select";


const StyledStepFourForm = styled.form`
`;
const StepFourForm = ({reset=()=>{},create = () =>{},typeviolence=[],typerestrictions=[],sendpreparationlist=[],guardianshipList=[],occuredRepetitionList=[],...props}) => {
    const { register, handleSubmit, watch, formState: { errors },setValue,control } = useForm();


    const onSubmit = (data) => {
     create(data);
    }

    const firstStep = () => {
        reset({firstStep: props.firstStep})
    }



    return (
        <StyledStepFourForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row >
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>4. Жабрланувчининг ўтказилган зўравонлик ҳақида маълумот</Title></Col>
            </Row>
            <Row className={'mb-48'}>
                {/*<Col xs={6} className={'mb-32'}>*/}
                {/*    <Label>Судланганлик ҳолати</Label>*/}
                {/*    <Textarea register={register} label={'Айни вақтда яшаш манзили'} name={'currentaddress'}*/}
                {/*              validation={{required: true}} error={errors?.currentaddress} noshadow sm/>*/}
                {/*</Col>*/}
                {/*<Col xs={6} className={'mb-32'}>*/}
                {/*    <Label>Тазйиқ ва зўравонликнинг қисқача фабуласи</Label>*/}
                {/*    <Textarea register={register} label={'Айни вақтда яшаш манзили'} name={'currentaddress'}*/}
                {/*              validation={{required: true}} error={errors?.currentaddress} noshadow sm/>*/}
                {/*</Col>*/}
                <Col xs={4} className={'mb-32'}>
                    <Label >Тазйиқ ва зўравонлик
                        турлари </Label>
                    <FormSelect
                                 options={typeviolence}
                                setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                                name={'typeviolencesId'}
                                label={'Тазйиқ ва зўравонлик\n' +
                                '                        турлари'} placeholder={'Тазйиқ ва зўравонлик\n' +
                    '                        турлари'}
                                error={errors?.typeviolencesId} isMulti/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Чеклов турлари</Label>
                    <FormSelect
                         options={typerestrictions}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'typerestrictionsId'}
                        label={'Чеклов турлари'} placeholder={'Чеклов турлари'}
                        error={errors?.typerestrictionsId} isMulti/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Guardianship </Label>
                    <FormSelect
                         options={guardianshipList}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'guardianshipsId'}
                        label={'Guardianship'} placeholder={'Guardianship'}
                        error={errors?.guardianshipsId} isMulti/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Send preparation</Label>
                    <FormSelect
                         options={sendpreparationlist}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'sendpreparationId'}
                        label={'Send preparation'} placeholder={'Send preparation'}
                        error={errors?.sendpreparationId}/>
                </Col>
                <Col xs={4} className={'mb-32'}>
                    <Label >Occured Repetition</Label>
                    <FormSelect
                        options={occuredRepetitionList}
                        setValue={setValue} Controller={Controller} rule={{required: true}} control={control}
                        name={'occurredrepetitionId'}
                        label={'Occured Repetition'} placeholder={'Occured Repetition'}
                        error={errors?.occurredrepetitionId}/>
                </Col>

            </Row>

            <Row className={'mb-48'}>
                <Col xs={12}>
                    <Button className={'mr-16'} type={'button'} onClick={firstStep} danger outlined back>Қайта
                        киритиш</Button>
                    <Button className={'mr-16'} type={'button'} onClick={() => props.previousStep()}
                            outlined>Ортга</Button>
                    <Button type={'submit'} success>Маълумотларни сақлаш</Button>
                </Col>
            </Row>
        </StyledStepFourForm>
    );
};

export default StepFourForm;
