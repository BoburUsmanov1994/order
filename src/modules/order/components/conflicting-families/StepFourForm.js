import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {Controller, useForm} from "react-hook-form";
import Title from "../../../../components/title";
import StepNav from "../../../../components/step-nav";
import Button from "../../../../components/button";
import Label from "../../../../components/elements/label";
import {get, isEqual} from "lodash";
import FormSelect from "../../../../components/elements/form-select";


const StyledStepFourForm = styled.form`
`;
const StepFourForm = ({reset=()=>{},create = () =>{},
                          criminalCaseList=[],
                          criminalCodexList=[],
                          administrativeList=[],
                          administrativeCodexList=[],
                          ...props}) => {
    const {register, handleSubmit, watch, getValues, formState: {errors}, setValue, control} = useForm();
    const [criminal,setCriminal] = useState('');
    const [administrative,setAdministrative] = useState('');
    const onSubmit = (data) => {
        create(data);
    }

    const firstStep = () => {
        reset({firstStep: props.firstStep})
    }


    return (
        <StyledStepFourForm {...props} onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col xs={12}><StepNav step={props.currentStep}/></Col>
            </Row>
            <Row className={'mb-48'}>
                <Col xs={12}><Title>4. Қўшимча маълумотлар</Title></Col>
            </Row>
            <Row className={'mb-48'}>

                <Col xs={4} className={'mb-32'}>
                    <Label>Ушбу ҳолат жиноят иши қўзғатилганлиги</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={criminalCaseList}
                        onChange={({label}) => setCriminal(label)}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'criminalcaseId'}
                        label={'Ушбу ҳолат жиноят иши қўзғатилганлиги'} placeholder={'Танланг'}
                        error={errors?.criminalcaseId}/>
                </Col>
                {isEqual(criminal,'Жиноят иши қўзғатилган') && <Col xs={4} className={'mb-32'}>
                    <Label>Жиноят кодекси модалари</Label>
                    <FormSelect
                        options={criminalCodexList}
                        setValue={setValue} Controller={Controller} control={control}
                        name={'criminalcodexId'}
                        label={'Жиноят кодекси модалари'} placeholder={'Танланг'}
                        error={errors?.criminalcodexId}/>
                </Col>}
                <Col xs={4} className={'mb-32'}>
                    <Label>Ушбу ҳолат бўйича маъмурий жавобгарликка тортилганлиги</Label>
                    <FormSelect
                        rule={{required: true}}
                        options={administrativeList}
                        setValue={setValue} Controller={Controller}  control={control}
                        onChange={({label}) => setAdministrative(label)}
                        name={'administrativeworkId'}
                        label={'Ушбу ҳолат бўйича маъмурий жавобгарликка тортилганлиги'} placeholder={'Танланг'}
                        error={errors?.administrativeworkId}/>
                </Col>


                {isEqual(administrative,"Жавобагрликка тортилган") && <Col xs={4} className={'mb-32'}>
                    <Label>Маъмурий кодекси моддалари</Label>
                    <FormSelect
                        options={administrativeCodexList}
                        setValue={setValue} Controller={Controller}  control={control}
                        name={'administrativecodexId'}
                        label={'Маъмурий кодекси моддалари'} placeholder={'Танланг'}
                        error={errors?.administrativecodexId}/>
                </Col>}

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
